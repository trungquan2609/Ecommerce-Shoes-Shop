const Contact = require('../../models/contact_model')

class ContactController {
    contact(req, res, next) {
        res.render('site/contact/contact', {
            title: 'Liên hệ',
            styles: ['login'],
            scripts: [],
            layout: 'layout_site.hbs'
        })
    }

    success(req, res, next) {
        res.render('site/contact/success', {
            title: 'Liên hệ thành công',
            styles: ['login'],
            scripts: [],
            layout: 'layout_site.hbs'
        })
    }

    sendContact(req, res, next) {
        var content = req.body
        var message = new Contact({
            fullname: content.fullname,
            email: content.email,
            phone: content.phone,
            message: content.message
        })
        message.save()
        .then(res.redirect('/contact/success'))
    }

    
}

module.exports = new ContactController