const adminRouter = require('./site');
const productRouter = require('./product');
const brandRouter = require('./brand');
const orderRouter = require('./order');
const userRouter = require('./user');
const homepageRouter = require('./edithomepage');
const stockinRouter = require('./stockin');
const contactRouter = require('./contact');
const modRouter = require('./mod');
const profileRouter = require('./profile');

function routeAdmin(app) {

    app.use('/admin/profile', profileRouter)
    app.use('/admin/moderator', modRouter)
    app.use('/admin/contact', contactRouter)
    app.use('/admin/stockin', stockinRouter)
    app.use('/admin/edithomepage', homepageRouter)
    app.use('/admin/user', userRouter)
    app.use('/admin/order', orderRouter);
    app.use('/admin/brand', brandRouter);
    app.use('/admin/product', productRouter);
    app.use('/admin', adminRouter);

}

module.exports = routeAdmin;
