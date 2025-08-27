import { contextBridge, ipcRenderer } from "electron";

const api: Api = {
  apiRequest: async (route, method, data) => {
    return ipcRenderer.invoke("api-request", route, method, data);
  },
};

contextBridge.exposeInMainWorld("api", api);
