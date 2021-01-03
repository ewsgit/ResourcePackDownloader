const { app, BrowserWindow } = require('electron');
const path = require('path');
const { Menu } = require('electron');
const isMac = process.platform === 'darwin';
const { autoUpdater } = require('electron-updater');


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    icon: 'src/appicon.ico'
  });

    // and load the index.html of the app.

    mainWindow.loadFile(path.join(__dirname, 'index.html'))

    
const template = [

]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

mainWindow.once('ready-to-show', () => {
  autoUpdater.checkForUpdatesAndNotify();
});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
