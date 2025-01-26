const sqlite3 = require('sqlite3').verbose()
global.db = new sqlite3.Database('sklep.db')

