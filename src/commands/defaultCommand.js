import TorrentLibrary from 'torrent-files-library';
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear-terminal';

import menu from '../components/menu';
import eventHandler from '../components/eventHandler';


const { log } = console;

export default {
  command: '*',
  describe: 'The default command, without JSON file',
  handler() {
    clear();

    // lib instance
    const libInstance = new TorrentLibrary();

    // handle events provided by libInstance
    eventHandler(libInstance);

    log(chalk.yellow(figlet.textSync(
      'TFL',
      { horizontalLayout: 'full' },
    )));
    menu(libInstance);
  },
};
