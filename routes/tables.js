var express = require('express');
var router = express.Router();

let statment = db.prepare('SELECT * FROM sqlite_master');
let table_names = []

const p = new Promise((resolve,reject) => {
  statment.all((err, rows) => {
    for(const row of rows) {
      if(row.type == 'table') {
        if(row.tbl_name.includes("sqlite")) continue;
        table_names.push(row.tbl_name)
      }
    }
    resolve(table_names);
  })
}).then((table_names) =>{
  for(table of table_names) {
    console.log(`table name: ` + table);
    db.each(`PRAGMA table_info(${table});`, (err, row) => {
      console.log(row);
    }
  )
  }
}) 



/* GET values from a table. */
router.get('/*', function(req, res, next) {
  const tableName = req.originalUrl.split(`/`).slice(-1).toString()
  const calledQuery = `SELECT * FROM ${tableName}`;
  var list = ``
  db.serialize(() => {
    db.each(calledQuery, (err, row) => {
      list += `<tr>`
      for(const column of Object.keys(row)) {
        list += `<td>${row[column]}</td>`
      }
      list += `</tr>`
    }, (err, rowCount) => res.send({list, calledQuery}))
  })
});

module.exports = router;

