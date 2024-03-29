const express = require('express');
const router = express.Router();

const cartController = require('../../app/controllers/site/CartController.js');

router.post('/orders', cartController.order);

router.post('/orders/:orderID/capture', cartController.captureOrder);

router.get('/checkout', cartController.checkout);

router.get('/remove/:id', cartController.removeItem);

router.get('/addtocart/:id', isLoggedIn, cartController.addToCart)

router.get('/updatecart', cartController.updateCart)

router.get('/', cartController.index);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.locals.oldUrl = req.url;
    console.log(res.locals.oldUrl)
    res.redirect('/user/login');
}
