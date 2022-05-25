const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const route = require('./routes/site');

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

route(app);

app.listen(port);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });