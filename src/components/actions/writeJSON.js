import chalk from 'chalk';

const fs = require('fs');

const { log } = console;
const JSON_FILENAME = 'TFL-cli.json';

export default function writeJSON(libInstance) {
  return new Promise((resolve, reject) => {
    log(chalk.green(`Writing the JSON into ${JSON_FILENAME} !\n`));
    fs.writeFile(JSON_FILENAME, libInstance.toJSON(), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
