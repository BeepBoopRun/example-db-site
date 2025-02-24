import Router from 'express-promise-router';
var router = new Router();

import * as db from '../db/index.js'
import format from "pg-format"

router.post('/', async function(req, res, next) {
  const body = req.body

  const calledQuery = format(
    `
    DELETE FROM customers WHERE customer_id=%L
    `,
    body.id
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