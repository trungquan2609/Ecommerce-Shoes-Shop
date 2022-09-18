const dataTotal = require('./dataTotal.js');
const product = require('./product.js');

function routeApi(app) {

    app.use('/api/product', product)
    app.use('/api', dataTotal);
}

module.exports = routeApi;
