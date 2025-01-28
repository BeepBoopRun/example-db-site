import Router from 'express-promise-router';
var router = new Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.send(`PANEL PRACOWNIKA JUŻ WKRÓTCE`);
});

export default router;