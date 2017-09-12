import chalk from 'chalk';
import * as inquirer from 'inquirer';

require('babel-polyfill');

const { log } = console;

export default async function listShows(libInstance) {
  const mapSeries = libInstance.allTvSeries;

  const selectSerieQuestion =
        {
          type: 'list',
          name: 'serie',
          message: 'Select a tv-show : ',
          choices: ['All', ...mapSeries.keys()],
          default: 0,
        };

  function displayEpisodesForShow(seasonEpisodes, optionalSeparator = '') {
    seasonEpisodes
      .forEach(episode => log(`\t\t${optionalSeparator} ${episode.filePath}`));
  }

  async function displaySeasonsForShow(showName) {
    const prefix = 'Season ';
    const episodeSet = new Set([...(mapSeries.get(showName))]
      .map(episode => episode.season));
    const seasonString = [...episodeSet]
      .map(seasonNumber => `${prefix + seasonNumber}`);
    const selectSeason = {
      type: 'list',
      name: 'season',
      message: 'Select a season : ',
      choices: ['All', ...seasonString],
    };

    const promise2 = await new Promise((resolve) => {
      inquirer.prompt(selectSeason)
        .then((answers) => {
          if (answers.season === 'All') {
            // display all
            const seasonNumbers = seasonString
              .slice(1)
              .map(stringSeason => stringSeason.slice(prefix.length))
              .map(Number);
            for (const seasonNumber of seasonNumbers) {
              const seasonEpisodes = [...(mapSeries.get(showName))]
                .filter(episode => episode.season === seasonNumber);
              // TODO Not show because promise is resolved
              displayEpisodesForShow(seasonEpisodes, '\t');
            }
            resolve();
          } else {
            const seasonNumber = parseInt(
              (answers.season).slice(prefix.length)
              , 10,
            );
            const seasonEpisodes = [...(mapSeries.get(showName))]
              .filter(episode => episode.season === seasonNumber);
            log(chalk.bgBlue(`\t ${answers.season}`));
            displayEpisodesForShow(seasonEpisodes);
            resolve();
          }
        });
    });
    return promise2;
  }

  async function displayShows() {
    const promise = await new Promise((resolve) => {
      inquirer.prompt(selectSerieQuestion)
        .then((answers) => {
          if (answers.serie === 'All') {
            // display all
          } else {
            log(chalk.bgBlue(`${answers.serie}`));
            resolve(displaySeasonsForShow(answers.serie));
          }
        });
    });
    return promise;
  }

  await displayShows();
}
