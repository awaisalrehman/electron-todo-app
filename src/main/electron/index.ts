import { app } from "electron";
import { createMainWindow } from "./window";
import { registerAppEvents } from "./appEvents";
import { registerIpcHandlers } from "./ipcHandlers";
import { Server } from "@server/server";

if (require("electron-squirrel-startup")) {
  app.quit();
}

let server: Server | undefined;

app.whenReady().then(async () => {
  // Start backend server
  server = new Server();
  await server.start();

  // Create main window
  createMainWindow();

  // Register IPC & app lifecycle events
  registerIpcHandlers();
  registerAppEvents();
});

app.on("before-quit", async () => {
  if (server) {
    await server.stop?.(); // ensure proper shutdown if implemented
  }
});
