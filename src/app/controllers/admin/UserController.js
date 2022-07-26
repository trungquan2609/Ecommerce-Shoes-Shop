const User = require('../../models/user_model');

class UserController {
    async index(req, res, next) {
        const user = await User.find();
        res.render('admin/user/index', {
            style: ['image'],
            layout: 'layout_admin.hbs',
            user
        })
    }
}

module.exports = new UserController;