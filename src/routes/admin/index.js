const adminRouter = require('./site');
const productRouter = require('./product');

function routeAdmin(app) {
    app.use('/admin/product', productRouter)
    app.use('/admin', adminRouter);

}

module.exports = routeAdmin;
