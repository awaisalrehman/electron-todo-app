import { contextBridge, ipcRenderer } from "electron";

const api: Api = {
  apiRequest: async (route, method, data) => {
    return ipcRenderer.invoke("api-request", route, method, data);
  },
};

const electronApi: ElectronAPI = {
  onNavigate: (callback: (path: string) => void) => {
    ipcRenderer.on('navigate-to', (_, path) => callback(path));
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  }
};

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld('electronAPI', electronApi);
