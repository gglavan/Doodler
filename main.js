const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({width: 1200, height: 1000, title: 'Doodler', icon: path.join(__dirname, '/assets/icons/pen.png.ico')})
  
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  const menu = Menu.buildFromTemplate([{
    label: 'File',
    submenu: [
      {label: 'New file'},
      {
        label: 'Open file',
        click() {

        }
      },
      {label: 'Save as...'},
      {label: 'Close'},
      {type: 'separator'},
      {
        label: 'Exit',
        click() {
          app.quit();
        }
      }
    ]
  }])
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})