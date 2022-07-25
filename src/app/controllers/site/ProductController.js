const Product = require('../../models/product_model');
const Brand = require('../../models/brand_model');
const { multipleMongooseToObject } = require('../../../util/mongoose');
const { mongoosesToObject } = require('../../../util/mongoose');
String.prototype.toObjectId = function() {
    var ObjectId = (require('mongoose').Types.ObjectId);
    return new ObjectId(this.toString());
};
const _ = require('lodash');
const user_model = require('../../models/user_model');

class ProductController {

    // Get /site/products
    index(req, res, next) {
        Product.aggregate([
            { $group: {_id: {
                SKU: '$SKU',
                name: '$productName',
                price: '$price' ,
                salePrice: '$salePrice',
                productImage: '$productImage'
            }}}
        ])
            .then(products => res.render('site/product/product', {
                title: 'N&Q Shop',
                styles: ['product','productdetail'],
                scripts: ['product'],
                layout: 'layout_site.hbs',
                products,
            }))
            .catch(next);
    }

    sort(req, res, next) {
        if ( req.params.brandid && req.param('sn') === 'name' ) {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
                { $sort: { '_id.name' : parseInt(req.param('s')) } }
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.param('brand')
                }))
                .catch(next);
        }
        else if ( req.params.brandid && req.param('sn') == 'price' ) {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
                { $sort: { '_id.price' : parseInt(req.param('s')) } }
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.param('brand')
                }))
                .catch(next);
        } else {
            Product.aggregate([
                { $match: { brandId: req.params.brandid.toObjectId() }},
                { $group: {_id: {
                    SKU: '$SKU',
                    name: '$productName',
                    price: '$price' ,
                    salePrice: '$salePrice',
                    productImage: '$productImage',
                }}},
            ])
                .then(products => res.render('site/product/product', {
                    title: 'N&Q Shop',
                    styles: ['product','productdetail'],
                    scripts: ['product'],
                    layout: 'layout_site.hbs',
                    products : products,
                    brand: req.param('brand')
                }))
                .catch(next);
        }
    }

    //GET site/productdetail
    detail(req, res, next) {
        var user = req.user ? req.user : null;
        
        var message = req.flash('info')
        if (message == 'Đã thêm vào giỏ hàng') {
            var info = 'success';
        } else {
            var info = 'danger'
        }
        Product.find({ SKU: req.params.SKU}).populate('brandId','brandName')
            // .then(function (product) {
            //     res.send((product));
            // })
            .then(product => res.render('site/product/productDetail', {
                title: 'N&Q Shop',
                styles: ['productdetail'],
                scripts: ['zoomsl','productdetai'],
                layout: 'layout_site.hbs',
                product,
                user,
                message,
                info
            }))
            .catch(next);
    }

}

module.exports = new ProductController;
