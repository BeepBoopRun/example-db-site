import Router from 'express-promise-router';
var router = new Router();

import * as db from '../db/index.js'
import format from "pg-format"

/* GET values from a table. */
router.get('/:tableName', async (req, res) => {
  const {tableName} = req.params;
  const calledQuery = format('SELECT * FROM %I', tableName);  

  const result = await db.query(calledQuery);
  var list = ``
  for(const row of result.rows) {
    list += `<tr>`
    for(const column of Object.keys(row)) {
      list += `<td>${row[column]}</td>`
    }
    list += `</tr>`
    console.log(list)
  }
  res.send({list, calledQuery})
});

export default router;
