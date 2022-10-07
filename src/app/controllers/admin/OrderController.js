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
        var orderId = req.params.id;
        var q = {
            confirmStatus: req.body.confirmStatus
        }
        if ( req.body.confirmStatus == 'Huỷ đơn hàng') {
            var product = await Order.findById(orderId)
            for (var i in product.productId) {
                var productSKUUpdate = product.productId[i].item.SKU
                var productSizeUpdate = product.productId[i].item.size
                var quantityUpdate = product.productId[i].qty
                var q1 = await Product.find({$and: [{SKU: productSKUUpdate}, {size: productSizeUpdate}]})
                var q2 = await Product.updateOne({$and: [{SKU: productSKUUpdate}, {size: productSizeUpdate}]}, {$set:{quantity: (q1[0].quantity + quantityUpdate)}})
            }
        }
        Order.updateOne({ _id: orderId}, q)
            .then(res.redirect('/admin/order/'))
    }
}

module.exports = new OrderController;
