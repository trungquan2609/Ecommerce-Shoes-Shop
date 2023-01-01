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
const routeSite = require('./src/routes/site');
const routeAdmin = require('./src/routes/admin');
const routeApi = require('./src/routes/api');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
var passport = require('passport');
const flash = require('connect-flash');
const db = require('./src/config/connectDB');
const global = require('./src/config/global');
const templateEngine = require('./src/config/templateEngine');
const cors = require('cors');
const xlsx = require('xlsx');

app.use(cors());
require('dotenv').config({ 
  debug: true,
});
// DB connect
db.connect();

// Static files
app.use(express.static(path.join(__dirname, '/src/public')));

// [METHOD POST]
const bodyParser = require('body-parser');
app.use(cookieParser(''));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport

require('./src/config/passport')(passport);

// const clientP = mongoose.connect(
//   process.env.DATABASE_URL,
//   { useNewUrlParser: true, useUnifiedTopology: true }
// ).then(m => m.connection.getClient())

app.use(session({
  secret: 'guesswhat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    // clientPromise: clientP,
    // dbName: "test",
    mongoUrl: process.env.DATABASE_URL,
    touchAfter: 24 * 3600
  }),
  cookie: {
    sameSite: false
  }
}));
app.use(flash());
app.use(passport.initialize({userProperty: "user"}));
app.use(passport.session());
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
