const Order = require('../../models/order_model')
const User = require('../../models/user_model');
const Product = require('../../models/product_model');

class OrderController {

    // Get /admin/index
    async index(req, res, next) {
        Order.find().populate('userId').sort({createdAt : -1})
            .then(rs => res.render('admin/order/order', {
                style: [],
                layout: 'layout_admin.hbs',
                rs
            }))
            // .then(rs => res.send(rs))
    }

    async detail(req, res, next) {
        Order.findById(req.params.id).populate('userId')
            .then(rs => res.render('admin/order/orderdetail', {
                style: [],
                layout: 'layout_admin.hbs',
                rs
            }))
    }

    async update(req, res, next) {
        var productId = req.params.id;
        var q = {
            confirmStatus: req.body.confirmStatus
        }
        Order.updateOne({ _id: productId}, q)
            .then(res.redirect('/admin/order/'))
    }
}

module.exports = new OrderController;
