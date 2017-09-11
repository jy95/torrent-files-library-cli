import chalk from 'chalk';

const { log } = console;

export default function scan(libInstance) {
  log(chalk.cyan(`${libInstance.allFilesWithCategory}.\n`));
}
