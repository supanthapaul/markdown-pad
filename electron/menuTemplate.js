// const { Menu, BrowserWindow } = require('electron');

const getMenuTemplate = (mainWindow) => {
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New File',
          enabled: false,
          click() { mainWindow.webContents.send('file:new') },
          accelerator: 'CommandOrControl+N'
        },
        {
          label: 'Open Folder',
          click() { mainWindow.webContents.send('directory:open') },
          accelerator: 'CommandOrControl+O'
        },
        {
          label: 'Save',
          click() { mainWindow.webContents.send('file:save') },
          accelerator: 'CommandOrControl+S'
        },
        { type: 'separator' },
        { role: 'Quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
  ];

  // showing the actual 'FIle' menu on MacOS
  if (process.platform === 'darwin') {
    menuTemplate.unshift({});
  }
  // open developer tools  when not in production
  if (process.env.NODE_ENV === 'dev') {
    menuTemplate.push({
      label: 'DEVELOPER',
      submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' }
      ]
    });
  }

  return menuTemplate
}



module.exports = getMenuTemplate;