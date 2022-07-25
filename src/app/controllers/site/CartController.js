const Cart = require('../../models/cart_model');
const Product = require('../../models/product_model');
const Order = require('../../models/order_model');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
// const paypal = require('@paypal/checkout-server-sdk');
// const Environment =
//   process.env.NODE_ENV === "production"
//     ? paypal.core.LiveEnvironment
//     : paypal.core.SandboxEnvironment
// const paypalClient = new paypal.core.PayPalHttpClient(
//   new Environment(
//     process.env.PAYPAL_CLIENT_ID,
//     process.env.PAYPAL_CLIENT_SECRET
//   )
// )
const paypal = require('../../../config/paypal-api')

class CartController {
    
    //Get Cart
    index(req, res, next) {
        if (req.session.cart) {
            res.render('site/cart/cart', {
                title: 'Giỏ hàng',
                styles: ['cart'],
                scripts: [''],
                layout: 'layout_site.hbs',
                items: req.session.cart.items,
                cart: req.session.cart
            })
        } else {
            res.render('site/cart/cart', {
                title: 'Giỏ hàng',
                styles: ['cart'],
                scripts: [''],
                layout: 'layout_site.hbs',
            })
        }
        var listItems = [];
        for (var i in req.session.cart.items) {
            listItems.push(req.session.cart.items[i])
        }
        console.log(listItems)
    }
    
    async addToCart(req, res, next) {
        var productId = await mongoose.Types.ObjectId(req.params.id);
        var currentQuantityProduct = await Product.findById(productId)
        var qty = parseInt(req.param('qty'));
        if (currentQuantityProduct.quantity >= qty) {
            var count = currentQuantityProduct.quantity - qty
            var updateQuantityProduct = {quantity: count};
            const q = await Product.findOneAndUpdate({ _id: productId}, updateQuantityProduct)
            var cart = new Cart(req.session.cart ? req.session.cart : {});
            Product.findById(productId, function (err, product) {
                if (err) {
                    return res.redirect('/');
                }
                cart.add(product, qty, product._id)
                req.session.cart = cart;
                // console.log(req.session.cart);
                req.flash('info', 'Đã thêm vào giỏ hàng');
                res.redirect('back')
            })
        } else {
            req.flash('info', 'Tồn kho không đủ ');
            res.redirect('back')
        }
        // Product.find( {_id:productId})
        //     .then(function(product) {
        //         cart.add(product, product._id)
        //         req.session.cart = cart;
        //         console.log(req.session.cart);
        //     })
        //     .then(res.redirect('back'))
    }

    async removeItem(req, res, next) {
        var productId = req.params.id;
        var currentQuantityProduct = await Product.findById(productId)
        var qty = parseInt(req.param('qty'));
        var count = currentQuantityProduct.quantity + qty

        var updateQuantityProduct = {quantity: count};
        const q = await Product.findOneAndUpdate({ _id: productId}, updateQuantityProduct)
        var doc = await Product.findById(productId)
        console.log(doc);
        var cart = new Cart(req.session.cart ? req.session.cart : {});

        cart.removeItem(productId);
        req.session.cart = cart;
        res.redirect('/cart');
    }

    async checkout(req, res, next) {
        console.log(req.user)
        res.render('site/cart/checkout', {
            title: 'Thanh toán',
            styles: ['pay'],
            scripts: ['checkout', 'pay'],
            layout: 'layout_site.hbs',
            clientId: process.env.PAYPAL_CLIENT_ID,
            user: req.user,
            cart: req.session.cart,
            items: req.session.cart.items
        })
    }

    //POST /cart/create-order
    async order(req, res, next) {

        try {
            const base = "https://api-m.sandbox.paypal.com";
            const total = await req.session.cart.totalPrice ? ((req.session.cart.totalPrice + 50000) / 23405).toFixed(2) : 0;
            
            async function createOrder() {
                const accessToken = await paypal.generateAccessToken();
                const url = `${base}/v2/checkout/orders`;
                const response = await fetch(url, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: total,
                                },
                            },
                    ],
                }),
            });
            
                return paypal.handleResponse(response);
            }
            const order = await createOrder();
            res.json(order);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    //POST /cart/capture-order
    async captureOrder(req, res, next) {
        const { orderID } = req.params;
        try {
            var listItems = [];
            const captureData = await paypal.capturePayment(orderID);
            var paypalFee = await (captureData.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value * 23405).toFixed(2);
            var lastReceive = await (captureData.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value * 23405).toFixed(2);
            for (var i in req.session.cart.items) {
                listItems.push(req.session.cart.items[i])
            }
            var storeOrder = {
                userId: req.user._id,
                productId: listItems,
                totalPrice: req.session.cart.totalPrice,
                status: "PayPal",
                paypalFee: paypalFee,
                lastTotal: lastReceive,
            }
            const order = new Order(storeOrder)
            order.save()
                .then(() => res.redirect('/success'))
            // res.send(captureData);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new CartController;
