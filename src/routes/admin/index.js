const adminRouter = require('./site');

function routeAdmin(app) {

    app.use('/', adminRouter);

}

module.exports = routeAdmin;
