export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Api {
  apiRequest: <T = unknown, R = unknown>(
    route: string,
    method: HttpMethod,
    data?: T
  ) => Promise<R>;
}

declare global {
  interface Window {
    api: Api;
  }
}
