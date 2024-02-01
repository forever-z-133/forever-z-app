import { join } from 'node:path'
import { BrowserView, BrowserWindow, app } from 'electron'
import installDefaultExtension from './src/utils/installDefaultExtension'

// 去掉 Electron Security Warning 相关警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const isDev = process.env.NODE_ENV === 'development'

function createWindow() {
  installDefaultExtension()

  // 初始化骨架屏
  const skeletonView = new BrowserView()
  skeletonView.setBounds({ x: 0, y: 0, width: 800, height: 600 })
  skeletonView.webContents.loadURL('./src/assets/skeleton.html')

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, './preload.js'),
    },
  })
  isDev && win.webContents.openDevTools({ mode: 'right' })

  win.setBrowserView(skeletonView)

  if (process.env.VITE_DEV_SERVER_URL) {
    setTimeout(() => {
      win.loadURL(process.env.VITE_DEV_SERVER_URL)
      win.show()
    }, 2000)
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
