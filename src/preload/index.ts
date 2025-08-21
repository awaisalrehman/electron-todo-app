import { contextBridge, ipcRenderer } from 'electron';

interface Api {
  apiRequest: <T = unknown, R = unknown>(
    route: string,
    method: string,
    data?: T
  ) => Promise<R>;
}

const api: Api = {
  apiRequest: async <T, R>(route: string, method: string, data?: T): Promise<R> => {
    return ipcRenderer.invoke('api-request', { route, method, data });
  },
};

contextBridge.exposeInMainWorld('api', api);
