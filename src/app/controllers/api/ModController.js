const Admin = require('../../models/admin_model')

class ModController {
    delete(req, res, next) {
        if (req.user.role === 'admin') {
            Admin.updateOne({ _id: req.query.id}, {status: 'banned'})
            .then(res.redirect('/admin/moderator'))
            .catch(err => console.error(err));
        }
    }
}

module.exports = new ModController
