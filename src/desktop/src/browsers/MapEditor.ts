import { join } from 'node:path'
import { BrowserWindow } from 'electron'
import { desktopRootDir } from '../constants/paths'

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

  console.log('create main browser')
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(`${process.env.VITE_DEV_SERVER_URL}/map-editor`)
  } else {
    win.loadFile('../website/dist/index.html')
  }

  return win
}
