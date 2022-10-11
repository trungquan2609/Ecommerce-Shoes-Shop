const { response } = require('express');
const User = require('../../models/user_model');

class UserController {
    async index(req, res, next) {
        const userList = await User.find();
        res.render('admin/user/index', {
            style: ['image'],
            layout: 'layout_admin.hbs',
            userList,
        })
    }
}

module.exports = new UserController;