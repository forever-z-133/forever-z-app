import { BrowserWindow, app } from 'electron'
import installDefaultExtension from './src/utils/installDefaultExtension'
import { createMainBrowser } from './src/browsers/MainEditor'
import { createMapEditorBrowser } from './src/browsers/MapEditor'
import { initAppListener } from './src/main/ipc-main'

// 去掉 Electron Security Warning 相关警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const isDev = process.env.NODE_ENV === 'development'

function initChrome() {
  // 开启开发者工具
  isDev && installDefaultExtension()

  // 浏览器配置
  app.commandLine.appendSwitch('enable-unsafe-es3-apis')
  app.commandLine.appendSwitch('disable-feature', 'OutOfBlinkCors')
}

app.whenReady().then(() => {
  initChrome()
  initAppListener()
  createMainBrowser()
  createMapEditorBrowser()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainBrowser()
      createMapEditorBrowser()
    }
  })
})
// MAC 点叉退出，WIN 完全退出
app.on('window-all-closed', () => {
  console.log('==== 2')
  // app.quit()
  if (process.platform !== 'darwin') app.quit()
})
// MAC 完全退出
app.on('will-quit', () => {
  console.log('====')
})
