import Router from 'express-promise-router';
var router = new Router();

import * as db from '../db/index.js'
import format from "pg-format"

router.post('/', async function(req, res, next) {
  let body = req.body

  for (let key in body) {
    if (body[key] === '') {
      body[key] = null;
    }
  }

  const calledQuery = format(
    `
    CALL add_customer(%L,%L,%L,%L,%L,%L,%L,%L,%L)
    `,
    body.fname, body.lname, body.tel, body.email,body.city,body.street,body.streetn,body.streetn2,body.postal
  )

  let final_message;

  try {
    const result = await db.query(calledQuery);
    final_message = calledQuery;
    console.log(result)
  } catch (err) {
      console.error(err.message);
      final_message = err.message;

  } 

  res.send({final_message})  
});

export default router;