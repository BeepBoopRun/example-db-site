import Router from 'express-promise-router';
var router = new Router();

import * as db from '../db/index.js'
import format from "pg-format"

import * as pug from "../views/index.js"

router.get('/:tableName', async (req, res) => {
  const {tableName} = req.params;
  const calledQuery = format('SELECT * FROM %I', tableName);  

  const result = await db.query(calledQuery);

  const headers = []
  for(const header of Object.keys(result.rows[0])) {
        headers.push(header)
  }

  const resRows = []
  for(const row of result.rows) {
      const newRow = []
      for(const column of Object.keys(row)) {
        newRow.push(row[column])
      }
      resRows.push(newRow)
  }

  const outHTML = pug.tbGen({
    headers: headers,
    rows: resRows
  })

  res.send({outHTML, calledQuery})
});

export default router;
