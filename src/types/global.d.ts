declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  interface Api {
    apiRequest: <T = unknown, R = unknown>(
      route: string,
      method: HttpMethod,
      data?: T
    ) => Promise<R>;
  }

  interface ElectronAPI {
    onNavigate: (callback: (path: string) => void) => void;
    removeAllListeners: (channel: string) => void;
  }

  interface Window {
    api: Api;
    electronAPI: ElectronAPI;
  }
}

export {};
