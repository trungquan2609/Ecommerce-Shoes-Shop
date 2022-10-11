const Admin = require('../../models/admin_model')

class ProfileController {

    async profile(req, res, next) {
        var id = req.user._id
        const admin = await Admin.findById(id);
        res.render('admin/profile/profile', {
            style: ['image'],
            layout: 'layout_admin.hbs',
        })
    }
}

module.exports = new ProfileController;