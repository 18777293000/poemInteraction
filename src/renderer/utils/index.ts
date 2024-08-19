export default class Utils {
  static getCurrentLocale(): string {
    return navigator?.language?.split('-')[0] || 'en'
  }

  static async openExternal(url: string): Promise<void> {
    await window.mainApi.send('msgOpenExternalLink', url)
  }

  static async openFile(type: string): Promise<any> {
    return window.mainApi.invoke('msgOpenFile', type)
  }

  static resolvePath(dirPath: any): Promise<any> {
    // return path.join(Utils.startPath, dirPath || '.')
    return window.mainApi.invoke('resolveImgPath', dirPath)
  }
}

export const { getCurrentLocale, openExternal, openFile, resolvePath } = Utils
