const http = require('http');

const hostname = '127.0.0.1';

const express = require('express');
const session = require('express-session');
const app = express();
// const expressHandlebars = require('express-handlebars');
// const handlebars = require('handlebars');
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const morgan = require('morgan');
const routeSite = require('./routes/site');
const routeAdmin = require('./routes/admin');
const routeApi = require('./routes/api');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
// const Passport = require('passport').Passport;
// const passport = new Passport();
// const passportAdmin = new Passport();
var passport = require('passport');
const flash = require('connect-flash');
const db = require('./config/connectDB');
const global = require('./config/global');
const templateEngine = require('./config/templateEngine');
const cors = require('cors');
const xlsx = require('xlsx');

app.use(cors());
require('dotenv').config({ 
  debug: true,
});
// DB connect
db.connect();

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// [METHOD POST]
const bodyParser = require('body-parser');
app.use(cookieParser(''));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport

require('./config/passport')(passport);
require('./config/passportAdmin')(passport);

app.use(session({
  secret: 'guesswhat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL,
    touchAfter: 24 * 3600
  }),
  cookie: {
    sameSite: false
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// app.use(passportAdmin.initialize());
// app.use(passportAdmin.session());
app.use(methodOverride('_method'));

// HTTP Logger
app.use(morgan('combined'));

templateEngine(app);

global(app);

// Router
routeSite(app);
routeAdmin(app);
routeApi(app);

app.listen(process.env.PORT);
