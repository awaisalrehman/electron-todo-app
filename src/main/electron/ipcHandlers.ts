import { ipcMain } from "electron";
import type { Api } from "../../types/global";

type ApiRequestArgs = Parameters<Api["apiRequest"]>; 
// => [route: string, method: HttpMethod, data?: unknown]

export function registerIpcHandlers() {
  ipcMain.handle("api-request", async (_event, ...args: ApiRequestArgs) => {
    const [route, method, data] = args;

    try {
      const response = await fetch(`http://localhost:3001${route}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
      });

      return await response.json();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      return { success: false, error: message };
    }
  });
}
