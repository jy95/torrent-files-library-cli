#!/usr/bin/env node

// Module dependencies.
import TorrentLibrary from 'torrent-files-library';

// console import
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear-terminal';

import eventHandler from './components/eventHandler';
import menu from './components/menu';

const { log } = console;

// lib instance
let libInstance = new TorrentLibrary();

// handle events provided by libInstance
eventHandler(libInstance);

// for exits
process.on('SIGINT', () => {
  log(chalk.yellow('CTRL-C detected ! End of program'));
  process.exit();
});

process.on('uncaughtException', (err) => {
  log(chalk.yellow(`Error detected : ${err.message}`));
  process.exit();
});

clear();
log(chalk.yellow(figlet.textSync(
  'TFL',
  { horizontalLayout: 'full' },
)));
menu(libInstance);

