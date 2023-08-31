const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

// Initialize MOAI via Lua script
function initializeMOAI() {
    exec('lua src/main/lua/initialize_moai.lua', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error initializing MOAI: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
}

// Create the main application window
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('src/renderer/index.html');
}

app.whenReady().then(createWindow);

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