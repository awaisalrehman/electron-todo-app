declare global {
  type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  interface Api {
    apiRequest: <T = unknown, R = unknown>(
      route: string,
      method: HttpMethod,
      data?: T
    ) => Promise<R>;
  }

  interface Window {
    api: Api;
  }
}

export {};
