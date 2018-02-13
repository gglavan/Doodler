const { app, BrowserWindow, Menu } = require('electron');
const dialog = require('electron').dialog;
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;

let win;

function createWindow () {
  win = new BrowserWindow({
    show: false,
    backgroundColor: '#252A30',
    width: 1200,
    height: 800,
    title: 'Doodler',
    icon: path.join(__dirname, '/assets/icons/pen.png.ico')
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/welcome.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.once('ready-to-show', () => {
    win.show();
  })
  
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null;
  })

  const menu = Menu.buildFromTemplate([{
    label: 'File',
    submenu: [
      {
        label: 'New...',
        accelerator: process.platform === 'darwin' ? 'Cmd+N' : 'Ctrl+N',
        click() {
          win.loadURL(url.format({
            pathname: path.join(__dirname, 'src/index.html'),
            protocol: 'file:',
            slashes: true
          }));
        }
      },
      {
        label: 'Open...',
        accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O',
        click() {
          dialog.showOpenDialog({
            properties: ['openFile']
          }, function (file) {
            if (file) win.webContents.send('open-file', file);
          })          
        }
      },
      {
        label: 'Save as...',
        accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
        click() {
          dialog.showSaveDialog({
            properties: ['saveFile']
          }, function (file) {
            if (file) win.webContents.send('save-file', file);
          })
        }
      },
      {
        label: 'Close',
        accelerator: process.platform === 'darwin' ? 'Cmd+W' : 'Ctrl+W',
        click() {
          win.loadURL(url.format({
            pathname: path.join(__dirname, 'src/welcome.html'),
            protocol: 'file:',
            slashes: true
          }));
        }
      },
      { type: 'separator' },
      {
        label: 'Exit',
        accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  },{
  label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: process.platform === 'darwin' ? 'Cmd+Z' : 'Ctrl+Z',
        click() {
          win.webContents.send('undo-option');
        }
      },
      {
        label: 'Redo',
        accelerator: process.platform === 'darwin' ? 'Cmd+Y' : 'Ctrl+Y',
        click() {
          win.webContents.send('redo-option');
        }
      }
  ]}]);
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipc.on('new-project', (event, arg) => {  
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }));
});

ipc.on('open-project', (event, arg) => {  
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function (file) { 
    if (file) {
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
      }));
    }
    setTimeout(() => win.webContents.send('open-file', file), 1000);
  })
});