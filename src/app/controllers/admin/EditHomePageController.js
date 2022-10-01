const Order = require('../../models/order_model')
const User = require('../../models/user_model');
const Product = require('../../models/product_model');
const Homepage = require('../../models/homepage_model');

class HomepageController {

    index(req, res, next) {
        res.render('admin/edithomepage/index', {
            title: 'Sửa trang chủ',
            layout: 'layout_admin.hbs',
        })
    }

    edit(req, res, next) {
        res.render('admin/edithomepage/edit', {
            title: 'Sửa trang chủ',
            layout: 'layout_admin.hbs',
        })
    }
}

module.exports = new HomepageController;
