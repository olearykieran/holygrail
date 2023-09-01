const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');

let mainWindow;

// Initialize MOAI via Lua script
function initializeMOAI() {
  exec('moai src/main/lua/initialize_moai.lua', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error initializing MOAI in main: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}

ipcMain.on('get-app-path', (event) => {
  event.sender.send('get-app-path', app.getAppPath());
});

// Read directory contents
function readDir(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
    console.log(files);
    mainWindow.webContents.send('update-file-list', files);
  });
}

// Create the main application window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      contentSecurityPolicy: "script-src 'self'"
    }
  });

  mainWindow.loadFile('src/renderer/index.html').then(() => {
    mainWindow.webContents.send('get-app-path', app.getAppPath());
    readDir(__dirname);
  });
}

app.whenReady().then(() => {
  createWindow();
  initializeMOAI();
});

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
