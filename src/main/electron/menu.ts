import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";

export function setupMenu(mainWindow: BrowserWindow): void {
  const template: MenuItemConstructorOptions[] = [
    {
      label: "Navigation",
      submenu: [
        {
          label: "Login",
          accelerator: "CmdOrCtrl+L",
          click: () => mainWindow.webContents.send("navigate-to", "/login"),
        },
        {
          label: "Register",
          accelerator: "CmdOrCtrl+R",
          click: () => mainWindow.webContents.send("navigate-to", "/register"),
        },
        {
          label: "Todos",
          accelerator: "CmdOrCtrl+T",
          click: () => mainWindow.webContents.send("navigate-to", "/todos"),
        },
      ],
    },
    {
      label: "View",
      submenu: [{ role: "forceReload" }, { role: "toggleDevTools" }],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}