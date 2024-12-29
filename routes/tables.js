var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/*', function(req, res, next) {
  const tableName = req.originalUrl.split(`/`).slice(-1).toString()
  var list = ``

  db.serialize(() => {
    db.each(`SELECT * FROM ${tableName}`, (err, row) => {
      list += `<tr>`
      for(const column of Object.keys(row)) {
        list += `<td>${row[column]}</td>`
      }
      list += `</tr>`
    }, (err, rowCount) => res.send(list))

  })
  
});

module.exports = router;
