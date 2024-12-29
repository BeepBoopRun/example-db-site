var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.send(`
<head>
  <meta http-equiv='refresh' content='0; URL=/szefuncio'>
</head>
`);
});

module.exports = router;
