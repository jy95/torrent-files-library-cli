import chalk from 'chalk';

const { log } = console;

export default function addNewPaths(libInstance) {
  log(chalk.cyan(`${libInstance.allFilesWithCategory}.\n`));
}
