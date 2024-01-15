import path from 'path'
import { createServer } from 'http'
import handler from 'serve-handler'
import { app, BrowserWindow, ipcMain } from 'electron'

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = path.join(process.env.ROOT, '.output/public')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const preload = path.join(process.env.DIST, 'preload.js')
let win: BrowserWindow

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    minWidth: 600,
    minHeight: 600,
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    const server = createServer((req, res) => {
      return handler(req, res, {
        public: process.env.VITE_PUBLIC,
      })
    })

    server.listen(1111, () => {
      win.loadURL('http://localhost:1111/')
    })
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('resize-window', (_, arg) => {
  const currentHeight = win.getSize()[1]

  win.setSize(arg.width, currentHeight)
})
