const Contact = require('../../models/contact_model')

class ContactController {
    async index(req, res, next) {
        var contact = await Contact.find()
        res.render('admin/contact/index', {
            title: 'Liên hệ',
            layout: 'layout_admin.hbs',
            contact
        })
    }

    async confirm(req, res, next) {
        var id = req.params.id
        Contact.updateOne({_id:id}, {status: 'Đã liên hệ'})
        .then(res.redirect('/admin/contact'))
    }
}

module.exports = new ContactController

