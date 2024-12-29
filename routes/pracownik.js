var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.send(`PANEL PRACOWNIKA JUŻ WKRÓTCE`);
});

module.exports = router;
