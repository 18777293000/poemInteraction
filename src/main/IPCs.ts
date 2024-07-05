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
        const stmt = sqlite3db.db.prepare('INSERT INTO poetry (name, phone) VALUES (?, ?)');
        stmt.run(name, phone, function (err) {
          if (err) {
            return reject(err);
          }
          stmt.finalize();
          return resolve('Item added successfully.');
        });
      })
    });

    ipcMain.handle('delete-item', async (event: IpcMainEvent, id) => {
      return new Promise((resolve, reject) => {
        sqlite3db.db.run('DELETE FROM poetry WHERE id = ?', id, function (err: any) {
          if (err) {
            return reject(err);
          }
          return resolve('Item deleted successfully.');
        });
      })
    });

    ipcMain.handle('queryByWord', async (event: IpcMainEvent, word) => {
      return new Promise((resolve, reject) => {
        sqlite3db.db.all(`
          SELECT *  
          FROM poetry  
          WHERE content LIKE '%${word}%'  
          ORDER BY id ASC  
          LIMIT 1;
          `, [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    });

    ipcMain.handle('queryById', async (event: IpcMainEvent, id) => {
      return new Promise((resolve, reject) => {
        sqlite3db.db.all('SELECT FROM poetry WHERE id = ?', [id], (err, rows) => {
          if(err){reject(err)}
          resolve(rows);
        })
      })
    });
  }
}
