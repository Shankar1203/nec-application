const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
    
    const startURL = 'http://localhost:3000'

    const win = new BrowserWindow({
        width: 1500,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
        }
    });

    win.maximize();
    win.show();
    win.setMenuBarVisibility(false);

    win.loadURL(startURL);
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});