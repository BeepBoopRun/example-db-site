import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import tablesRouter from './routes/tables.js';
import szefuncioRouter from './routes/szefuncio.js';
import indexRouter from './routes/index.js';
import addClientRouter from './routes/add_client.js';
import modifyClientRouter from './routes/modify_client.js';
import removeClientRouter from './routes/remove_client.js';

var app = express();

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/add_client', addClientRouter);
app.use('/remove_client', removeClientRouter);
app.use('/modify_client', modifyClientRouter);
app.use('/tables', tablesRouter);
app.use('/szefuncio', szefuncioRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
  message: err.message,
  error: err
  });
});

export default app;