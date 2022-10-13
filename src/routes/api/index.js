const dataTotal = require('./dataTotal.js');
const product = require('./product.js');
const cart = require('./cart.js');
const feedback = require('./feedback')
const order = require('./order');
const mod = require('./mod.js');
const statistics = require('./statistics.js');

function routeApi(app) {

    app.use('/api/statistics', statistics)
    app.use('/api/mod', mod)
    app.use('/api/order', order)
    app.use('/api/feedback', feedback)
    app.use('/api/cart', cart)
    app.use('/api/product', product)
    app.use('/api', dataTotal);
}

module.exports = routeApi;
