import Reporter from 'promise-reporter';
import chalk from 'chalk';

const { log } = console;

export default function scan(libInstance) {
  if (!libInstance.hasPathsProvidedByUser()) {
    log(chalk.yellow.italic(`No path was provided so this path will be used : ${
      process.cwd()}`));
  }

  const reporter = new Reporter();
  reporter.pipe(process.stderr);
  reporter.add('Scanning director(y/ies)', libInstance.scan());
  return reporter.end();
}
