import Router from 'express-promise-router';
var router = new Router();

import * as db from '../db/index.js'
import format from "pg-format"

router.post('/', async function(req, res, next) {
  console.log(req.body)

  const body = req.body

  const calledQuery = format(
    `WITH ids AS (INSERT INTO addresses VALUES (DEFAULT,%L,%L,%L,%L,%L) RETURNING address_id)
     INSERT INTO customers VALUES (DEFAULT,%L,%L,%L,%L,(SELECT address_id FROM ids))
    `,
    body.city,body.street,body.streetn,body.streetn2,body.postal,
    body.fname, body.lname, body.tel, body.email);

  const result = await db.query(calledQuery);
  
  console.log(result)

  res.send({calledQuery})  
});

export default router;