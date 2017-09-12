import chalk from 'chalk';

const { log } = console;

export default function listMovies(libInstance) {
  log(chalk.cyan('Movies :\n'));
  for (const movie of libInstance.allMovies) {
    log(chalk.magenta(movie.title + ((movie.year) ? ` - ${movie.year}` : '')));
  }
}
