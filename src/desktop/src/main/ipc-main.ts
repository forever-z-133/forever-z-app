import { BrowserWindow, app, ipcMain } from 'electron'

const apis = {
  getVersion() {
    return app.getVersion()
  },
}

// 主线程接收渲染进程的消息，若需返回则返回
export function initAppListener() {
  ipcMain.handle('cross', async (event, opts, ...args) => {
    const { eventName, callback = false, globally = false } = opts
    if (globally) {
      BrowserWindow.getAllWindows().forEach((win) => {
        if (win.webContents === event.sender) return // 全局广播时，不给自己发
        win.webContents.send('cross-back', eventName, ...args)
      })
    } else {
      const api = apis[eventName]
      const res = api ? await api(...args) : undefined
      if (!callback) return res
      event.sender.send('cross-back', eventName, res)
    }
  })
}
