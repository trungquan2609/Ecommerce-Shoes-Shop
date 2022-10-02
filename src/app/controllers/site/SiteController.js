const Homepage = require('../../models/homepage_model');
const Product = require('../../models/product_model');

class SiteController {

    // Get /site/index
    async index(req, res, next) {
        var q1 = await Homepage.find({name:'SẢN PHẨM MỚI'})
        var newProduct = await Product.aggregate([
            { $match: { $or : [ {SKU: q1[0].SKU}, {SKU: q1[0].SKU2}, {SKU: q1[0].SKU3}, {SKU: q1[0].SKU4}]}},
            { $group: {_id: {
                SKU: '$SKU',
                name: '$productName',
                price: '$price' ,
                salePrice: '$salePrice',
                productImage: '$productImage',
            }}},
        ])
        var q2 = await Homepage.find({name:'TOP SẢN PHẨM HOT'})
        var topProduct = await Product.aggregate([
            { $match: { $or : [ {SKU: q2[0].SKU}, {SKU: q2[0].SKU2}, {SKU: q2[0].SKU3}, {SKU: q2[0].SKU4}]}},
            { $group: {_id: {
                SKU: '$SKU',
                name: '$productName',
                price: '$price' ,
                salePrice: '$salePrice',
                productImage: '$productImage',
            }}},
        ])
        var q3 = await Homepage.find({name:'CÓ THỂ BẠN SẼ THÍCH'})
        var likeProduct = await Product.aggregate([
            { $match: { $or : [ {SKU: q3[0].SKU}, {SKU: q3[0].SKU2}, {SKU: q3[0].SKU3}, {SKU: q3[0].SKU4}]}},
            { $group: {_id: {
                SKU: '$SKU',
                name: '$productName',
                price: '$price' ,
                salePrice: '$salePrice',
                productImage: '$productImage',
            }}},
        ])
        res.render('site/index', {
            title: 'N&Q Shop',
            styles: ['productdetail'],
            scripts: [],
            layout: 'layout_site.hbs',
            newProduct,
            topProduct,
            likeProduct,
        })
    }

    // Get /site/intro
    intro(req, res, next) {
        res.render('site/intro', {
            title: 'Giới thiệu',
            styles: [],
            scripts: [],
            layout: 'layout_site.hbs'
        });
    }

    success(req, res, next) {
        res.render('site/success', {
            title: 'Đặt hàng thành công',
            styles: [],
            scripts: [],
            layout: 'layout_site.hbs'
        })
    }

    contact(req, res, next) {
        res.render('site/contact', {
            title: 'Liên hệ',
            styles: ['login'],
            scripts: [],
            layout: 'layout_site.hbs'
        })
    }
}

module.exports = new SiteController;
