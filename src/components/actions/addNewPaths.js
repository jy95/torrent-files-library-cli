import Reporter from 'promise-reporter';
import selectDirectory from 'inquirer-select-directory';
import * as inquirer from 'inquirer';

require('babel-polyfill');

inquirer.registerPrompt('directory', selectDirectory);

const questions = [
  {
    type: 'directory',
    name: 'from',
    message: 'Which folder would you like to add ?',
    basePath: '.',
  },
  {
    type: 'confirm',
    name: 'anythingElse',
    message: 'Do you wish to add anything else ?',
    default: false,
  },
];

export default async function addNewPaths(libInstance) {
  let paths = [];

  function report() {
    const reporter = new Reporter();
    reporter.pipe(process.stderr);

    for (const path of paths) {
      reporter.add(`Path ${path}`, libInstance.addNewPath(path));
    }
    return reporter.end();
  }

  function promptAgain() {
    return inquirer.prompt(questions[1]);
  }

  function promptAddPaths() {
    return inquirer.prompt(questions[0]);
  }

  async function getPaths() {
    let promise = await new Promise((resolve) => {
      promptAddPaths()
        .then((answer) => {
          paths = [...paths, answer.from];
          return promptAgain();
        }).then((confirm) => {
          if (!confirm.anythingElse) {
            resolve(report());
          } else {
            resolve(getPaths());
          }
        });
    });
    return promise;
  }
  await getPaths();
}
