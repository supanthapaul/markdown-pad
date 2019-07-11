const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const getMenuTemplate = require('./electron/menuTemplate');

let mainWindow;
app.on('ready', () => {
  // getting full window size
  const { width, height } = require('electron').screen.getPrimaryDisplay().size;
  mainWindow = new BrowserWindow({ width, height });

  // get start url from env or production
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);

  const menuTemplate = getMenuTemplate(mainWindow);
  // set application menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  mainWindow.on('closed', () => mainWindow = null);
});

// choose directory
ipcMain.on('directory:choose', (event) => {
  dialog.showOpenDialog(mainWindow,
    { properties: ['openDirectory'] },
    (filePaths) => {
      if (filePaths) {
        mainWindow.webContents.send('directory:chosen', filePaths[0]);
      }
    });
});

// directory is chosen, new file is creatable
ipcMain.on('file:creatable', () => {
  Menu.getApplicationMenu().items[0].submenu.items[0].enabled = true;
});
// state has changed to no active directory, disable new file option
ipcMain.on('file:not-creatable', () => {
  Menu.getApplicationMenu().items[0].submenu.items[0].enabled = false;
});
