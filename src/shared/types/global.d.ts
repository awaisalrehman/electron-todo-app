declare global {
  interface Window {
    api: {
      apiRequest: <T = unknown>(route: string, method: string, data?: unknown) => Promise<T>;
    };
  }
}

export {};
