const Product = require('../../models/product_model')

class CartController {
    async cart(req, res, next) {
        if(req.session.cart) {
            var cart = req.session.cart.items
            var product
            res.json(cart)
        }
    }
}

module.exports = new CartController;
