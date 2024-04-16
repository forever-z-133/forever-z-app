import { join } from 'node:path'
import { BrowserView, BrowserWindow } from 'electron'
import { desktopRootDir } from '../constants/paths'

const rootPath = desktopRootDir
const isDev = process.env.NODE_ENV === 'development'

export async function createMainBrowser() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // transparent: true,
    title: '',
    webPreferences: {
      preload: join(rootPath, './preload.mjs'),
    },
  })

  // 初始化骨架屏
  const skeletonView = new BrowserView()
  skeletonView.setBackgroundColor('red')
  skeletonView.setBounds({ x: 0, y: 0, width: 800, height: 600 })
  skeletonView.webContents.loadURL('../src/assets/skeleton.html')

  isDev && win.webContents.openDevTools({ mode: 'right' })

  win.setBrowserView(skeletonView)

  console.log('create main browser')
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('../website/dist/index.html')
  }

  win.removeBrowserView(skeletonView)

  return win
}
