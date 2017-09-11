import chalk from 'chalk';
import * as inquirer from 'inquirer';
import * as actions from './actions';

const { log } = console;

const questions = [
  {
    type: 'list',
    name: 'action',
    message: 'What would like to do ?',
    choices: [
      'Add new paths to be scanned',
      'Scan paths',
      'List movies',
      'List tv-series',
      'Save result as JSON',
      'Other exit',
    ],
    default: 5,

  },
  {
    type: 'confirm',
    name: 'anythingElse',
    message: 'Do you wish to do anything else',
    default: false,
  },
];

export default function (libInstance) {
  function menu() {
    log('\n');
    inquirer.prompt(questions[0])
      .then((answers) => {
        switch (answers.action) {
          case 'Add new paths to be scanned':
            actions.addNewPaths(libInstance);
            break;
          case 'Scan paths':
            actions.scan(libInstance);
            break;
          case 'List movies':
            break;
          case 'List tv-series':
            break;
          case 'Save result as JSON':
            break;
          default:
            log(chalk.red('End of program'));
            process.exit();
        }
        inquirer.prompt(questions[1]).then((confirm) => {
          if (!confirm.anythingElse) {
            log(chalk.red("'No' detected! Good bye!\n"));
            process.exit();
          }
          menu();
        });
      });
  }

  menu();
}
