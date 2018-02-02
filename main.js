const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

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
          
        }
      },
      {
        label: 'Save as...',
        accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
        click() {
          
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
  }]);
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
    createWindow()
  }
});