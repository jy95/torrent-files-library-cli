import chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as actions from './actions';
import eventHandler from './eventHandler';

const { log } = console;

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What would like to do ?',
    choices: [
      'Add new folders to be scanned',
      'Scan paths',
      'List movies',
      'List tv-series',
      'Save result as JSON',
      'Other exit',
    ],
    default: 0,

  },
  {
    type: 'confirm',
    name: 'anythingElse',
    message: 'Do you wish to do anything else ?',
    default: false,
  },
];

export default function (libInstance) {
  function again(callback) {
    inquirer.prompt(questions[1]).then((confirm) => {
      if (!confirm.anythingElse) {
        log(chalk.red("'No' detected! Good bye!\n"));
        process.exit();
      }
      callback();
    });
  }

  function menu() {
    log('\n');
    inquirer.prompt(questions[0])
      .then((answers) => {
        let promise;
        switch (answers.action) {
          case 'Add new folders to be scanned':
            promise = actions.addNewPaths(libInstance);
            break;
          case 'Scan paths':
            promise = actions.scan(libInstance);
            break;
          case 'List movies':
            promise = actions.listMovies(libInstance);
            break;
          case 'List tv-series':
            promise = actions.listShows(libInstance);
            break;
          case 'Save result as JSON':
            break;
          default:
            log(chalk.red('End of program'));
            process.exit();
        }
        return promise;
      }).then(() => {
        again(menu);
      });
  }
  // handle events provided by libInstance
  eventHandler(libInstance);

  menu();
}
