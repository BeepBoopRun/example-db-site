import Router from 'express-promise-router';
var router = new Router();

router.post('/', function(req, res, next) {  
  console.log("done!")
  res.send(`CLIENT DATA RECEIVED`);
});

export default router;