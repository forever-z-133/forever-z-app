import { contextBridge } from 'electron'
import {
  getFromApp,
  initRendererListener,
  offMessageFromWeb,
  onMessageFromWeb,
  sendToApp,
  sendToOtherWeb,
} from './src/renderer/ipc-renderer'

console.log('=== preload')

initRendererListener()

const apis = {
  sendToApp,
  getFromApp,
  sendToOtherWeb,
  onMessageFromWeb,
  offMessageFromWeb,
}
contextBridge.exposeInMainWorld('electron', apis)
