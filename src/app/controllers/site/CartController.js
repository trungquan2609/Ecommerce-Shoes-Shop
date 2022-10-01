const Cart = require('../../models/cart_model');
const Product = require('../../models/product_model');
const Order = require('../../models/order_model');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const User = require('../../models/user_model');
const Receipt = require('../../models/receipt_model');
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
const paypal = require('../../../config/paypal-api');
const { request } = require('express');

class CartController {
    
    //Get Cart
    async index(req, res, next) {
        
        if (req.session.cart) {
            console.log(req.session.cart);

            res.render('site/cart/cart', {
                title: 'Giỏ hàng',
                styles: ['cart'],
                scripts: ['cart'],
                layout: 'layout_site.hbs',
                items: req.session.cart.items,
                cart: req.session.cart
            })
        } else {
            res.render('site/cart/cart', {
                title: 'Giỏ hàng',
                styles: ['cart'],
                scripts: ['cart'],
                layout: 'layout_site.hbs',
            })
        }
    }
    
    async addToCart(req, res, next) {
        var productId = await mongoose.Types.ObjectId(req.params.id);
        var currentQuantityProduct = await Product.findById(productId)
        var qty = parseInt(req.param('qty'));
        if (currentQuantityProduct.quantity >= qty) {
            var count = currentQuantityProduct.quantity - qty
            var updateQuantityProduct = {quantity: count};
            const q = await Product.findOneAndUpdate({ _id: productId}, updateQuantityProduct)
            console.log(q)
            var cart = new Cart(req.session.cart ? req.session.cart : {});
            Product.findById(productId, function (err, product) {
                if (err) {
                    return res.redirect('/');
                }
                cart.add(product, qty, product._id)
                req.session.cart = cart;
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

    updateCart(req, res) {
        var param = req.param('id')
        var param2 = req.param('quantity')
        var cart = req.session.cart;
        var totalQty = 0
        var totalPrice = 0
        var items = {}
        var updateCart = {
        }
        for ( var i in param) {
            var id = `${param[i]}`;
            var qty = parseInt(param2[i]);
            var price = cart.items[id].item.currentPrice
            var item = cart.items[id]
            totalQty += qty
            item.qty = qty;
            item.price = qty*cart.items[id].item.currentPrice
            items[id] = item
            updateCart.items = items
            updateCart.totalQty = totalQty
            totalPrice += item.price
            updateCart.totalPrice = totalPrice

        }
        req.session.cart = updateCart
        res.redirect('/cart/checkout')
    }

    async checkout(req, res, next) {

        res.render('site/cart/checkout', {
            title: 'Thanh toán',
            styles: ['pay'],
            scripts: ['checkout'],
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
            var paypalFee = (captureData.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value * 23405).toFixed(2);
            var lastReceive = (captureData.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value * 23405).toFixed(2);
            for (var i in req.session.cart.items) {
                listItems.push(req.session.cart.items[i])
            }
            var storeOrder = {
                userId: req.user._id,
                productId: listItems,
                totalPrice: req.session.cart.totalPrice,
                totalQty: req.session.cart.totalQty,
                status: "Đã thanh toán",
                confirmStatus: "Chưa xác nhận",
                paymentMethod: {
                name: "PayPal",
                paypalFee: paypalFee,
                lastTotal: lastReceive,
            }
            }
            // const receipt = await Receipt.find().sort({createdAt: -1}).limit(1);
            // const currentReceipt = receipt.receipt? receipt.receipt :0  + parseInt(req.session.cart.totalPrice)
            var nextReceipt = {
                receipt: req.session.cart.totalPrice
            };
            
            const q1 = new Receipt(nextReceipt);
            q1.save();
            const order = new Order(storeOrder);
            order.save();
            const user = await User.findById(req.user._id)
            var userTotalSpent = user.totalSpent + parseInt(req.session.cart.totalPrice);
            const q = await User.findByIdAndUpdate({ _id: req.user._id} , { totalSpent: userTotalSpent})
            req.session.cart = null;
            res.send(captureData);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new CartController;
