import Router from 'express-promise-router';
var router = new Router();


router.get('/', function(req, res, next) {  
  res.send(`PANEL PRACOWNIKA JUŻ WKRÓTCE`);
});

export default router;