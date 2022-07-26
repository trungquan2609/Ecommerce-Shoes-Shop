const adminRouter = require('./site');
const productRouter = require('./product');
const brandRouter = require('./brand');
const orderRouter = require('./order');

function routeAdmin(app) {

    app.use('/admin/order', orderRouter);
    app.use('/admin/brand', brandRouter);
    app.use('/admin/product', productRouter);
    app.use('/admin', adminRouter);

}

module.exports = routeAdmin;
