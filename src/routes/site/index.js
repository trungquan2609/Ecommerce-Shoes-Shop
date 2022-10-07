const siteRouter = require('./site');
const userRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');
const feedbackRouter = require('./feedback');
const contactRouter = require('./contact');

function routeSite(app) {

    app.use('/contact', contactRouter);
    app.use('/feedback', feedbackRouter);
    app.use('/cart', cartRouter);
    app.use('/product', productRouter);
    app.use('/user', userRouter);
    app.use('/', siteRouter);

}

module.exports = routeSite;
