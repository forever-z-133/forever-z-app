import { join } from 'node:path'
import { BrowserWindow, app } from 'electron'
import installDefaultExtension from './src/utils/installDefaultExtension'

function createWindow() {
  installDefaultExtension()

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    webPreferences: {
      preload: join(__dirname, './preload.js'),
      devTools: process.env.NODE_ENV === 'development',
    },
  })
  win.webContents.openDevTools({ mode: 'right' })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('../website/dist/index.html')
  }

  return win
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
