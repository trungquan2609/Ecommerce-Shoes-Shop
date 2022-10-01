const adminRouter = require('./site');
const productRouter = require('./product');
const brandRouter = require('./brand');
const orderRouter = require('./order');
const userRouter = require('./user');
const homepageRouter = require('./edithomepage');

function routeAdmin(app) {

    app.use('/admin/edithomepage', homepageRouter)
    app.use('/admin/user', userRouter)
    app.use('/admin/order', orderRouter);
    app.use('/admin/brand', brandRouter);
    app.use('/admin/product', productRouter);
    app.use('/admin', adminRouter);

}

module.exports = routeAdmin;
