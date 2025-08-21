import { contextBridge, ipcRenderer } from "electron";
import type { Api } from "../types/global";

const api: Api = {
  apiRequest: async (route, method, data) => {
    return ipcRenderer.invoke("api-request", route, method, data);
  },
};

contextBridge.exposeInMainWorld("api", api);
