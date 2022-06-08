const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const routeSite = require('./routes/site');
const routeAdmin = require('./routes/admin');

const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const db = require('./config/connectDB');

// Passport
require('./config/passport');
app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP Logger
app.use(morgan('combined'));

// Template Engine
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
  }
}));
app.set('view engine',  'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// [METHOD POST]
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// DB connect
db.connect();

// Router
routeSite(app);
routeAdmin(app);

app.listen(port);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });