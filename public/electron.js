const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {

    const isDevModule = await import('electron-is-dev');
    const isDev = isDevModule.default;
    
    const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

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