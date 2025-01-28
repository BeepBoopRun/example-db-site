import Router from 'express-promise-router';
var router = new Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.send(`
<head>
  <meta http-equiv='refresh' content='0; URL=/szefuncio'>
</head>
`);
});

export default router;