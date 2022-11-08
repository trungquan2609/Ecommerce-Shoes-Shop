const express = require('express');
const router = express.Router();
const upload = require('../../config/uploadFileExcel');

const StockIn = require('../../app/controllers/admin/StockInController.js');

router.post('/addstockin', isLoggedIn, upload.single('stock_in-file'), StockIn.save)

router.get('/addstockin', isLoggedIn, StockIn.add)

router.get('/:id', isLoggedIn, StockIn.detail)

router.get('/', isLoggedIn, StockIn.index);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/login');
}