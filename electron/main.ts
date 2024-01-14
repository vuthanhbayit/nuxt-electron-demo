import path from 'path'
import { createServer } from 'http'
import handler from 'serve-handler'
import { app, BrowserWindow } from 'electron'

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = path.join(process.env.ROOT, '.output/public')
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const preload = path.join(process.env.DIST, 'preload.js')
let win: BrowserWindow

function bootstrap() {
  win = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
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

app.whenReady().then(bootstrap)
