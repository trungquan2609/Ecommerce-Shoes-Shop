const Order = require('../../models/order_model')
const User = require('../../models/user_model')
const Product = require('../../models/product_model')

class OrderController {
    async index(req, res, next) {
        var orderId = req.query.orderId
        var order = await Order.findById(orderId)
        res.json(order.productId)
    }

    async cancelOrder(req, res, next) {
        var orderId = req.query.id;
        var product = await Order.findById(orderId)
            for (var i in product.productId) {
                var productSKUUpdate = product.productId[i].item.SKU
                var productSizeUpdate = product.productId[i].item.size
                var quantityUpdate = product.productId[i].qty
                var q1 = await Product.find({$and: [{SKU: productSKUUpdate}, {size: productSizeUpdate}]})
                var q2 = await Product.updateOne({$and: [{SKU: productSKUUpdate}, {size: productSizeUpdate}]}, {$set:{quantity: (q1[0].quantity + quantityUpdate)}})
            }
        var q3 = await Order.updateOne({ _id: orderId}, {$set: {confirmStatus: 'Huỷ đơn hàng'}})
        res.redirect('/user/profile')
    }
}

module.exports = new OrderController;