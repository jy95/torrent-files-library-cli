
export default function (libInstance, term) {
  // handle events provided by libInstance
  libInstance
    .on('addNewPath', (callback) => {
      term.green(`The following paths were added : ${callback.paths}`);
    });

  libInstance.on('error_in_function', (callback) => {
    term.red.bold(`Function ${callback.functionName} 
        in torrent-files-library has the following error : ${callback.error}`);
  });
}
