import { contextBridge, ipcRenderer } from 'electron'

const api = {
  getTodos: () => ipcRenderer.invoke('get-todos')
}

contextBridge.exposeInMainWorld('api', api)
