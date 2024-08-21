import { ipcMain, shell, IpcMainEvent, dialog } from 'electron'
import Constants from './utils/Constants'
import sqlite3db from './sqlite3db'
/*
 * IPC Communications
 * */
export default class IPCs {
  static initialize(): void {
    // Get application version
    ipcMain.handle('msgRequestGetVersion', () => {
      return Constants.APP_VERSION
    })

    // Open url via web browser
    ipcMain.on('msgOpenExternalLink', async (event: IpcMainEvent, url: string) => {
      await shell.openExternal(url)
    })

    // Open file
    ipcMain.handle('msgOpenFile', async (event: IpcMainEvent, filter: string) => {
      const filters = []
      if (filter === 'text') {
        filters.push({ name: 'Text', extensions: ['txt', 'json'] })
      } else if (filter === 'zip') {
        filters.push({ name: 'Zip', extensions: ['zip'] })
      }
      const dialogResult = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters
      })
      return dialogResult
    })

    // 假设你已经有了 db 连接
    ipcMain.handle('add-item', async (event: IpcMainEvent, { name, phone }) => {
      return new Promise((resolve, reject) => {
        const stmt = sqlite3db.db.prepare('INSERT INTO poetry (name, phone) VALUES (?, ?)')
        stmt.run(name, phone, function (err) {
          if (err) {
            return reject(err)
          }
          stmt.finalize()
          return resolve('Item added successfully.')
        })
      })
    })
    // 添加用户
    ipcMain.handle('add-user', async (event: IpcMainEvent, { name, student_id, college }) => {
      return new Promise((resolve, reject) => {
        const insertSql = 'INSERT INTO students (name, student_id, college) VALUES (?,?,?)'
        sqlite3db.db.run(insertSql, [name, student_id, college], function (err) {
          if (err) {
            return reject(err)
          }
          resolve('Item added successfully.')
        })
      })
    })

    // 查询所有用户
    ipcMain.handle('get-all-users', async (event: IpcMainEvent) => {
      return new Promise((resolve, reject) => {
        const querySql = 'SELECT * FROM students'
        sqlite3db.db.all(querySql, [], (err, rows) => {
          if (err) {
            return reject(err)
          }
          resolve(rows)
        })
      })
    })

    ipcMain.handle('delete-item', async (event: IpcMainEvent, id) => {
      return new Promise((resolve, reject) => {
        sqlite3db.db.run('DELETE FROM poetry WHERE id = ?', id, function (err: any) {
          if (err) {
            return reject(err)
          }
          return resolve('Item deleted successfully.')
        })
      })
    })

    ipcMain.handle('queryByWord', async (event: IpcMainEvent, word) => {
      return new Promise((resolve, reject) => {
        sqlite3db.db.all(
          `
          SELECT *
          FROM poetry
          WHERE content LIKE '%${word}%'
          ORDER BY id ASC
          LIMIT 1;
          `,
          [],
          (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
          }
        )
      })
    })

    ipcMain.handle('queryById', async (event: IpcMainEvent, id) => {
      // console.log('ENTER querybyid')
      return new Promise((resolve, reject) => {
        sqlite3db.db.all('SELECT * FROM poetry WHERE id = ?', [id], (err, rows) => {
          // console.log('queryByIderr', err);
          // console.log('queryByIdrow', rows);
          if (err) {
            reject(err)
          }
          resolve(rows)
        })
      })
    })

    ipcMain.handle('queryTableLength', async (event: IpcMainEvent, tableName: string) => {
      return new Promise((resolve, reject) => {
        sqlite3db.db.get(`SELECT COUNT(*) AS count FROM ${tableName}`, (err, rows) => {
          if (err) reject(err)
          resolve(rows)
        })
      })
    })

    ipcMain.handle('queryByLastWord', async (event: IpcMainEvent, word: string) => {
      return new Promise((resolve, reject) => {
        sqlite3db.db.all(
          `SELECT *
                          FROM poetry
                          WHERE content LIKE '%${word}%';
                          `,
          (err, rows) => {
            if (err) reject(err)
            let result = []
            let test = [`，${word}`, `。${word}`]
            // console.log("rows length", rows.length);
            for (let i = 0; i < rows.length; i++) {
              let e = rows[i]
              if (e.content.startsWith(word)) {
                result.push(e)
                resolve(result)
                break
              }
              if (test.some((i) => e.content.includes(i))) {
                result.push(e)
                resolve(result)
                break
              }
            }
            //  for循环结束，没有找到合适的诗词
            reject(new Error('无诗词'))
            // resolve(rows);
          }
        )
      })
    })
  }
}
