#!/usr/bin/env node

// Module dependencies.
import TorrentLibrary from 'torrent-files-library';

// console import
import { terminal as term } from 'terminal-kit';
import eventHandler from './actions/eventHandler';
import menu from './actions/menu';

// lib instance
let libInstance = new TorrentLibrary();

// handle events provided by libInstance
eventHandler(libInstance, term);

// for exits
process.on('SIGINT', () => {
  term.yellow('CTRL-C detected ! End of program');
  process.exit();
});

term.cyan('Welcome in torrent-files-library-cli\n');
menu(libInstance, term);

