const http = require('http');

const hostname = '127.0.0.1';

const express = require('express');
const session = require('express-session');
const app = express();
const expressHandlebars = require('express-handlebars');
const handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const morgan = require('morgan');
const routeSite = require('./routes/site');
const routeAdmin = require('./routes/admin');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const db = require('./config/connectDB');
const global = require('./config/global')
require('dotenv').config({ 
  debug: true,
});
// DB connect
db.connect();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// [METHOD POST]
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());
app.use(bodyParser.json());

// Passport
require('./config/passport');
app.use(session({
  secret: 'guesswhat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    // mongooseConnection: mongoose.connection
    touchAfter: 24 * 3600
  }),
  cookie: { 
    maxAge: 60 * 60 * 1000,
    secure: false
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


// HTTP Logger
app.use(morgan('combined'));

// Template Engine
app.engine('.hbs', expressHandlebars.engine({
  extname: '.hbs',
  handlebars: allowInsecurePrototypeAccess(handlebars),
  helpers: {
    sum: (a, b) => a + b,
    salePercent: (a, b) => Math.round(100 - (a / b * 100)),
    priceFormat: (a) => a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    json: function (context) {
      return JSON.stringify(context);
    },
    limit: function (object, max, options) {
      if(!object || object.length == 0)
        return options.inverse(this);

      var result = [ ];
      for(var i = 0; i < max && i < object.length; ++i)
          result.push(options.fn(object[i]));
      return result.join('');
    }
  },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

global(app),

// app.use(function (req, res, next) 
//   res.locals.login = req.isAuthenticated();
//   res.locals.session = req.session;
//   res.locals.userEmail = req.session.passport;
//   next();
// })

// Router
routeSite(app);
routeAdmin(app);

app.listen(process.env.PORT);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });