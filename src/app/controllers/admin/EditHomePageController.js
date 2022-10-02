const Order = require('../../models/order_model')
const User = require('../../models/user_model');
const Product = require('../../models/product_model');
const Homepage = require('../../models/homepage_model');

class HomepageController {

    async index(req, res, next) {
        var edithomepage = await Homepage.find()
        res.render('admin/edithomepage/index', {
            title: 'Sửa trang chủ',
            layout: 'layout_admin.hbs',
            edithomepage
        })
    }

    async edit(req, res, next) {
        var edithomepage = await Homepage.findById( req.params._id)
        res.render('admin/edithomepage/edit', {
            title: 'Sửa trang chủ',
            layout: 'layout_admin.hbs',
            edithomepage
        })
    }

    async update(req, res, next) {
        var update = req.body
        Homepage.updateOne( {_id: req.params._id}, update)
        .then(res.redirect('/admin/edithomepage'))
    }
}

module.exports = new HomepageController;
