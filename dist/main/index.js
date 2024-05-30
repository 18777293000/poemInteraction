"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const require$$2 = require("electron");
const require$$0 = require("path");
const url = require("url");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
const name = "vutron";
const version = "1.0.0";
const __dirname$1 = require$$0.dirname(url.fileURLToPath(typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.src || new URL("index.js", document.baseURI).href));
class Constants {
}
// Display app name (uppercase first letter)
__publicField(Constants, "APP_NAME", name.charAt(0).toUpperCase() + name.slice(1));
__publicField(Constants, "APP_VERSION", version);
__publicField(Constants, "IS_DEV_ENV", process.env.NODE_ENV === "development");
__publicField(Constants, "IS_MAC", process.platform === "darwin");
__publicField(Constants, "DEFAULT_WEB_PREFERENCES", {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  preload: require$$0.join(__dirname$1, "../preload/index.js")
});
__publicField(Constants, "APP_INDEX_URL_DEV", "http://localhost:5173/index.html");
__publicField(Constants, "APP_INDEX_URL_PROD", require$$0.join(__dirname$1, "../index.html"));
class IPCs {
  static initialize() {
    require$$2.ipcMain.handle("msgRequestGetVersion", () => {
      return Constants.APP_VERSION;
    });
    require$$2.ipcMain.on("msgOpenExternalLink", async (event, url2) => {
      await require$$2.shell.openExternal(url2);
    });
    require$$2.ipcMain.handle("msgOpenFile", async (event, filter) => {
      const filters = [];
      if (filter === "text") {
        filters.push({ name: "Text", extensions: ["txt", "json"] });
      } else if (filter === "zip") {
        filters.push({ name: "Zip", extensions: ["zip"] });
      }
      const dialogResult = await require$$2.dialog.showOpenDialog({
        properties: ["openFile"],
        filters
      });
      return dialogResult;
    });
  }
}
const exitApp = (mainWindow2) => {
  if (mainWindow2 && !mainWindow2.isDestroyed()) {
    mainWindow2.hide();
  }
  mainWindow2.destroy();
  require$$2.app.exit();
};
const createMainWindow = async (mainWindow2) => {
  mainWindow2 = new require$$2.BrowserWindow({
    title: Constants.APP_NAME,
    show: false,
    width: Constants.IS_DEV_ENV ? 1270 : 1270,
    height: 720,
    useContentSize: true,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES
  });
  mainWindow2.setMenu(null);
  mainWindow2.on("close", (event) => {
    event.preventDefault();
    exitApp(mainWindow2);
  });
  mainWindow2.webContents.on("did-frame-finish-load", () => {
    if (Constants.IS_DEV_ENV) {
      mainWindow2.webContents.openDevTools();
    }
  });
  mainWindow2.once("ready-to-show", () => {
    mainWindow2.setAlwaysOnTop(true);
    mainWindow2.show();
    mainWindow2.focus();
    mainWindow2.setAlwaysOnTop(false);
  });
  IPCs.initialize();
  if (Constants.IS_DEV_ENV) {
    await mainWindow2.loadURL(Constants.APP_INDEX_URL_DEV);
  } else {
    await mainWindow2.loadFile(Constants.APP_INDEX_URL_PROD);
  }
  return mainWindow2;
};
const createErrorWindow = async (errorWindow2, mainWindow2, details) => {
  if (!Constants.IS_DEV_ENV) {
    mainWindow2 == null ? void 0 : mainWindow2.hide();
  }
  errorWindow2 = new require$$2.BrowserWindow({
    title: Constants.APP_NAME,
    show: false,
    resizable: Constants.IS_DEV_ENV,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES
  });
  errorWindow2.setMenu(null);
  if (Constants.IS_DEV_ENV) {
    await errorWindow2.loadURL(`${Constants.APP_INDEX_URL_DEV}#/error`);
  } else {
    await errorWindow2.loadFile(Constants.APP_INDEX_URL_PROD, { hash: "error" });
  }
  errorWindow2.on("ready-to-show", () => {
    if (!Constants.IS_DEV_ENV && mainWindow2 && !mainWindow2.isDestroyed()) {
      mainWindow2.destroy();
    }
    errorWindow2.show();
    errorWindow2.focus();
  });
  errorWindow2.webContents.on("did-frame-finish-load", () => {
    if (Constants.IS_DEV_ENV) {
      errorWindow2.webContents.openDevTools();
    }
  });
  return errorWindow2;
};
let mainWindow;
let errorWindow;
require$$2.app.on("ready", async () => {
  if (Constants.IS_DEV_ENV) {
    Promise.resolve().then(() => require("./index.dev-ChX2m38u.js"));
  }
  mainWindow = await createMainWindow(mainWindow);
});
require$$2.app.on("activate", async () => {
  if (!mainWindow) {
    mainWindow = await createMainWindow(mainWindow);
  }
});
require$$2.app.on("window-all-closed", () => {
  mainWindow = null;
  errorWindow = null;
  if (!Constants.IS_MAC) {
    require$$2.app.quit();
  }
});
require$$2.app.on(
  "render-process-gone",
  (event, webContents, details) => {
    errorWindow = createErrorWindow(errorWindow, mainWindow);
  }
);
process.on("uncaughtException", () => {
  errorWindow = createErrorWindow(errorWindow, mainWindow);
});
