import { app, BrowserWindow, RenderProcessGoneDetails } from 'electron'
import Constants from './utils/Constants'
import IPCs from './IPCs'
import splite3db from './sqlite3db'

const exitApp = (mainWindow: BrowserWindow): void => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide()
  }
  mainWindow.destroy()
  app.exit()
}

export const createMainWindow = async (mainWindow: BrowserWindow): Promise<BrowserWindow> => {
  mainWindow = new BrowserWindow({
    title: Constants.APP_NAME,
    show: false,
    width: Constants.IS_DEV_ENV ? 1270 : 1270,
    height: 720,
    useContentSize: true,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES
  })

  mainWindow.setMenu(null)

  mainWindow.on('close', (event: Event): void => {
    //关闭软件，关闭sqlite连接
    splite3db.db.close((err) => {
      if (err) {
        return console.error(err.message)
      }
    })
    event.preventDefault()
    exitApp(mainWindow)
  })

  mainWindow.webContents.on('did-frame-finish-load', (): void => {
    if (Constants.IS_DEV_ENV) {
      mainWindow.webContents.openDevTools()
    }
  })

  mainWindow.once('ready-to-show', (): void => {
    mainWindow.setAlwaysOnTop(true)
    mainWindow.show()
    mainWindow.focus()
    mainWindow.setAlwaysOnTop(false)
  })

  //创建数据表
  splite3db.createDataTable()

  // Initialize IPC Communication
  IPCs.initialize()

  if (Constants.IS_DEV_ENV) {
    await mainWindow.loadURL(Constants.APP_INDEX_URL_DEV)
  } else {
    await mainWindow.loadFile(Constants.APP_INDEX_URL_PROD)
  }

  return mainWindow
}

export const createErrorWindow = async (
  errorWindow: BrowserWindow,
  mainWindow: BrowserWindow,
  details?: RenderProcessGoneDetails
): Promise<BrowserWindow> => {
  if (!Constants.IS_DEV_ENV) {
    mainWindow?.hide()
  }

  errorWindow = new BrowserWindow({
    title: Constants.APP_NAME,
    show: false,
    resizable: Constants.IS_DEV_ENV,
    webPreferences: Constants.DEFAULT_WEB_PREFERENCES
  })

  errorWindow.setMenu(null)

  if (Constants.IS_DEV_ENV) {
    await errorWindow.loadURL(`${Constants.APP_INDEX_URL_DEV}#/error`)
  } else {
    await errorWindow.loadFile(Constants.APP_INDEX_URL_PROD, { hash: 'error' })
  }

  errorWindow.on('ready-to-show', (): void => {
    if (!Constants.IS_DEV_ENV && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.destroy()
    }
    errorWindow.show()
    errorWindow.focus()
  })

  errorWindow.webContents.on('did-frame-finish-load', (): void => {
    if (Constants.IS_DEV_ENV) {
      errorWindow.webContents.openDevTools()
    }
  })

  return errorWindow
}
