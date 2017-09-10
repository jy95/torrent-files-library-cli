import * as actions from './entries';

export default function (libInstance, term) {
  function menu() {
    const items = [
      '1. Add new paths to be scanned',
      '2. Scan paths',
      '3. List movies',
      '4. List tv-series',
      '5. Save result as JSON',
      'Other exit',
    ];
    term.cyan('\n');
    term.singleColumnMenu(items, (error, response) => {
      if (error) { process.exitCode(1); }

      switch (response.selectedIndex) {
        case 1:
          actions.addNewPaths(libInstance, term);
          menu();
          break;
        case 2:
          actions.scan(libInstance, term);
          menu();
          break;
        default:
          term.red('End of program');
          process.exit();
      }
    });
  }
  menu();
}
