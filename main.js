const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('node:path');

async function createWindow() {

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

    win.loadURL(
        url.format({
            pathname: path.join(__dirname, '/build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );
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