#!/usr/bin/env node

// console import
import chalk from 'chalk';
import { rebuildWithFile, defaultCommand } from './commands';

const { log, error } = console;

// for exits
process.on('SIGINT', () => {
  log(chalk.yellow('CTRL-C detected ! End of program'));
  process.exit();
});

process.on('uncaughtException', (err) => {
  error(chalk.yellow(`Error detected : ${err.message}`));
  process.exit();
});

require('yargs') // eslint-disable-line
  .command(rebuildWithFile)
  .command(defaultCommand)
  .help()
  .argv;

