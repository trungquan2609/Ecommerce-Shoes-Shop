const dataTotal = require('./dataTotal.js');
const product = require('./product.js');
const cart = require('./cart.js');
const feedback = require('./feedback')
const order = require('./order');

function routeApi(app) {

    app.use('/api/order', order)
    app.use('/api/feedback', feedback)
    app.use('/api/cart', cart)
    app.use('/api/product', product)
    app.use('/api', dataTotal);
}

module.exports = routeApi;
