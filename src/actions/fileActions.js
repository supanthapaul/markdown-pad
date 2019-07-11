import { OPEN_DIRECTORY, LOAD_FILES, READ_FILE, NEW_FILE } from './actionConstants';

const fs = window.require('fs');
const { ipcRenderer } = window.require('electron');
const { dialog } = window.require('electron').remote;

export const openDirectory = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('directory:choose');

    ipcRenderer.on('directory:chosen', (event, directory) => {
      dispatch({
        type: OPEN_DIRECTORY,
        payload: directory
      });

      resolve(directory);
    });

  })
}

// create new file in active directory
export const newFile = (fileName) => (dispatch, getState) => {
  const { activeDir } = getState().directory;
  const fullFilePath = `${activeDir}/${fileName}.md`;

  // saveFileToDisk
  saveFileToDisk(fullFilePath, '')
    .then(msg => {
      console.log(msg);
      // reload directory files
      dispatch(loadFiles(activeDir));
    })
    .catch(msg => console.log(msg));
}

// save file action creator
export const saveFile = () => (dispatch, getState) => {
  const fileContent = getState().editor.text;
  const { activeFile, activeDir } = getState().directory;

  if (activeFile) {
    // we're editing a already existing file, just save it
    saveFileToDisk(activeFile.path, fileContent)
      .then(msg => console.log(msg))
      .catch(err => console.log(err));
  } else {
    // show save dialog
    dialog.showSaveDialog(
      { filters: [{ name: 'Markdown', extensions: ['md'] }] },
      // fileName string contains path+filename
      (fileName) => {
        saveFileToDisk(fileName, fileContent)
          .then(msg => {
            console.log(msg);
            // reload directory files if a directory is already loaded
            if (activeDir) dispatch(loadFiles(activeDir));
          })
          .catch(err => console.log(err));
      });
  }
}
// helper file saving method
const saveFileToDisk = (fullFilePath, content) => {
  return new Promise((resolve, reject) => {
    if (!fullFilePath) reject('user did not save');

    fs.writeFile(fullFilePath, content, (err) => {
      if (err) reject('error saving file');
      // file saved successfully
      resolve('file saved successfully');
    });
  });
}

// read a single file
export const readFile = (filePath) => dispatch => {

  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) console.log(err);
    dispatch({
      type: READ_FILE,
      payload: {
        path: filePath,
        content: data
      }
    });
  });
}

// load all files from a directory
export const loadFiles = (directory) => dispatch => {
  const fileRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.md)$/i;
  const matchedFiles = [];

  fs.readdir(directory, (err, files) => {
    files.forEach(fileName => {
      if (fileName.match(fileRegex)) {
        matchedFiles.push({
          name: fileName,
          path: `${directory}/${fileName}`
        });
      }
    });

    dispatch({
      type: LOAD_FILES,
      payload: matchedFiles
    });
  });
}

