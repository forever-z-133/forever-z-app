import { join } from 'node:path'
import { BrowserWindow } from 'electron'
import { desktopRootDir } from '../constants/paths'
import { sendToAllWeb } from '../main/ipc-main'

const rootPath = desktopRootDir
const isDev = process.env.NODE_ENV === 'development'

export async function createMainBrowser() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(rootPath, './preload.mjs'),
    },
  })

  isDev && win.webContents.openDevTools({ mode: 'right' })

  console.log('create map-editor browser')
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('../website/dist/index.html')
  }

  setInterval(() => {
    sendToAllWeb('timer', Date.now())
  }, 2000)

  return win
}
