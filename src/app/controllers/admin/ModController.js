const Admin = require('../../models/admin_model')

class ModController {
    async index(req, res, next) {
        console.log(req.user)
        res.render('admin/moderator/index', {
            title: 'Danh sách mod',
            style: [],
            layout: 'layout_admin.hbs',
        })
    }

    async add(req, res, next) {
        var messages = req.flash('error');
        res.render('admin/moderator/add', {
            title: 'Thêm mod',
            style: ['mod'],
            layout: 'layout_admin.hbs',
            messages,
            hasErrors: messages.length > 0,

        })
    }

    create(req, res, next) {
        var data = req.body
        // data.level = 'Mod'
        console.log(data)
    }
}

module.exports = new ModController;