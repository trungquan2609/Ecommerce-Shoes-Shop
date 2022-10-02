const siteRouter = require('./site');
const userRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');
const feedbackRouter = require('./feedback');

function routeSite(app) {

    app.use('/feedback', feedbackRouter);
    app.use('/cart', cartRouter);
    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);

}

module.exports = routeSite;
