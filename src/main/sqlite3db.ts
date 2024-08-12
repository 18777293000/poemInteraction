const sqlite3 = require('sqlite3')
const NODE_ENV = process.env.NODE_ENV
const path = require('path')
const { app } = require('electron')
let DB_PATH = path.join(app.getAppPath(), '/config/poetry.db')

console.log('database path:', app.getAppPath())
console.log('database path:', DB_PATH)

// 判断是否是正式环境
if (app.isPackaged) {
  // 正式环境
  DB_PATH = path.join(path.dirname(app.getPath('exe')), '/config/poetry.db')
}

//连接数据库
function connectDatabase() {
  return new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
      console.error('database connect error', err.message)
    }
    console.log('database connect success')
  })
}

const db = connectDatabase()

function createDataTable() {
  // console.log("创建表格")
  //创建用户表
  db.serialize(function () {
    db.run(`
            CREATE TABLE IF NOT EXISTS poetry (  
            id INTEGER PRIMARY KEY AUTOINCREMENT,  
            title TEXT NOT NULL COLLATE NOCASE CHECK(LENGTH(title) <= 200),  
            dynasty TEXT NOT NULL COLLATE NOCASE CHECK(LENGTH(dynasty) <= 50),  
            author TEXT NOT NULL COLLATE NOCASE CHECK(LENGTH(author) <= 100),  
            content TEXT COLLATE NOCASE);
        `)
    // db.run('create table if not exists ')
  })
  //db.close();
}

export default {
  connectDatabase: connectDatabase,
  createDataTable: createDataTable,
  db: db
}
