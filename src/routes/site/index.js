const siteRouter = require('./site');
const userRouter = require('./user');

function routeSite(app) {

    app.use('/account', userRouter);
    app.use('/', siteRouter);

}

module.exports = routeSite;
