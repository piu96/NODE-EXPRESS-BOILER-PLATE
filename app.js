require('./src/DB/db.connection.js'); // database register //
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
var app = express();
const corsOptions = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],

  allowedHeaders: [
    'Authorization',
    'Content-Type',
    'x-access-token',
    'x-forwarded-for'
  ],
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Enable Helmet for security
app.disable('x-powered-by')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Register Routes
app.use('/api/app', require('./src/routes/app')); // Registers all app-related routes
app.use('/api/web', require('./src/routes/web'));   // Registers all web-related routes

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 404 Handler - If no route matches
app.use((req, res, next) => {
  return res.status(404).json({ 
      success: false, 
      message: "Endpoint not found"
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error for debugging

  res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal Server Error"
  });
});

module.exports = app;
