const Order = require('../../models/order_model')
const User = require('../../models/user_model');
const Product = require('../../models/product_model');

class OrderController {

    // Get /admin/index
    async index(req, res, next) {
        Order.find().populate('userId')
            .then(rs => res.render('admin/order/order', {
                style: [],
                layout: 'layout_admin.hbs',
                rs
            }))
    }

    async detail(req, res, next) {
        Order.findById(req.params.id).populate('userId')
            .then(rs => res.render('admin/order/orderdetail', {
                style: [],
                layout: 'layout_admin.hbs',
                rs
            }))
    }
}

module.exports = new OrderController;
