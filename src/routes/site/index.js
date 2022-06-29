const siteRouter = require('./site');
const userRouter = require('./user');
const productRouter = require('./product');

function routeSite(app) {
    app.use('/product', productRouter)
    app.use('/user', userRouter);
    app.use('/', siteRouter);

}

module.exports = routeSite;
