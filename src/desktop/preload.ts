import { contextBridge } from 'electron'

console.log('=== preload')

const apis = {}
contextBridge.exposeInMainWorld('electron', apis)
