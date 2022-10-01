const dataTotal = require('./dataTotal.js');
const product = require('./product.js');
const cart = require('./cart.js');

function routeApi(app) {

    app.use('/api/cart', cart)
    app.use('/api/product', product)
    app.use('/api', dataTotal);
}

module.exports = routeApi;
