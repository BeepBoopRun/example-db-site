import Router from 'express-promise-router';
var router = new Router();
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.sendFile(path.join(__dirname, '../public', 'szef.html'))
});

export default router;