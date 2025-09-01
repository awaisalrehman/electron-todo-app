import { BrowserWindow } from "electron";
import { setupMenu } from "./menu";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  setupMenu(mainWindow);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.maximize();

  return mainWindow;
}
