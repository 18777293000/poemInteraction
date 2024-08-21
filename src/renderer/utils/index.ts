export default class Utils {
  private static isDev: string = 'prod'
  constructor() {}

  static getCurrentLocale(): string {
    return navigator?.language?.split('-')[0] || 'en'
  }

  static async openExternal(url: string): Promise<void> {
    await window.mainApi.send('msgOpenExternalLink', url)
  }

  static async openFile(type: string): Promise<any> {
    return window.mainApi.invoke('msgOpenFile', type)
  }

  static resolvePath(dirPath: string): string {
    const res = Utils.isDev === 'dev' ? dirPath : '../dist' + dirPath
    return res
  }
}

export const { getCurrentLocale, openExternal, openFile, resolvePath } = Utils
