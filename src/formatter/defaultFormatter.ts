import chalk from 'chalk';
import * as os from 'os';
import { NormalizedMessage } from '../NormalizedMessage';

/**
 * Creates new default formatter.
 *
 * @returns {defaultFormatter}
 */
export function createDefaultFormatter() {
  return function defaultFormatter(
    message: NormalizedMessage,
    useColors: boolean
  ) {
    const colors = new chalk.constructor({ enabled: useColors });
    const messageColor = message.isWarningSeverity()
      ? colors.bold.yellow
      : colors.bold.red;
    const fileAndNumberColor = colors.bold.cyan;
    const codeColor = colors.grey;

    return [
      messageColor(`${message.severity.toUpperCase()} in `) +
        fileAndNumberColor(
          `${message.file}(${message.line},${message.character})`
        ) +
        messageColor(':'),
      codeColor(message.getFormattedCode() + ': ') + message.content
    ].join(os.EOL);
  };
}
