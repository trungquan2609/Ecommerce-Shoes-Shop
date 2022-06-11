const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const session = require('express-session');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const routeSite = require('./routes/site');
const routeAdmin = require('./routes/admin');

const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const db = require('./config/connectDB');

// DB connect
db.connect();

// Passport
require('./config/passport');
app.use(session({
  secret: 'guesswhat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/selling_shoes'
    // mongooseConnection: mongoose.connection
  }),
  // cookie: { maxAge: 180 * 60 * 1000 }
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
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// [METHOD POST]
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

// Router
routeSite(app);
routeAdmin(app);

app.listen(port);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });