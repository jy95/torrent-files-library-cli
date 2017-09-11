import chalk from 'chalk';

const { log } = console;

export default function (libInstance) {
  // handle events provided by libInstance
  libInstance
    .on('addNewPath', (callback) => {
      log(chalk.green(`The following paths were added : ${callback.paths}`));
    });

  libInstance.on('error_in_function', (callback) => {
    log(chalk.red.bold(`Function ${callback.functionName} 
        in torrent-files-library has the following error : ${callback.error}`));
  });
}
