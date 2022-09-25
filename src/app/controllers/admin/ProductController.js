const Product = require('../../models/product_model');
const Brand = require('../../models/brand_model');
const multer = require('multer');

var mongoose = require('mongoose');
var objectId = mongoose.Types.ObjectId('569ed8269353e9f4c51617aa');

class ProductController {

    // Get /admin/index
    index(req, res, next) {
        Product.find().populate('brandId','brandName')
            .then(product => res.render('admin/product/show', {
                title: 'Sản phẩm',
                style: ['app', 'image'],
                script: ['dataTables'],
                layout: 'layout_admin.hbs',
                product: product
            }))
            // .then(product => res.send(product))
            .catch(next)
        
    }

    //Get /admin/product/add
    add(req, res, next) {
        Brand.find()
            .then(brand => res.render('admin/product/add', {
                title: 'Thêm sản phẩm',
                style: ['app'],
                script: ['dataTables'],
                layout: 'layout_admin.hbs',
                brand: brand
            }))
    }

    //POST /admin/product/store
    store(req, res, next) {
        if (req.file) {
            var productImage = req.file.filename;
        }
        const storeProduct = {
            SKU: req.body.SKU,
            productName: req.body.productName,
            brandId: mongoose.Types.ObjectId(req.body.brandId),
            price: req.body.price,
            salePrice: req.body.salePrice,
            currentPrice: req.body.salePrice ? req.body.salePrice : req.body.price,
            size: req.body.size,
            quantity: req.body.quantity,
            description: req.body.description,
            productImage: productImage,
        }
        const product = new Product(storeProduct)
        product.save()
            .then(() => res.redirect('/admin/product'))
            .catch(next)
    }

    //Delete /admin/product
    delete(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //Get /admin/editproduct
    async edit(req, res, next) {
        var brand = await Brand.find()
        Product.findById( req.params.id ).populate('brandId','brandName')
            .then(product =>res.render('admin/product/edit', {
                title: 'Sửa sản phẩm',
                style: ['app'],
                script: ['dataTables'],
                layout: 'layout_admin.hbs',
                product: product,
                brand: brand,
            }))
    }

    //POST /admin/editproduct
    async update(req, res, next) {
        if (req.file) {
            var productImage = req.file.filename;
            var updateProduct = await {
                SKU: req.body.SKU,
                productName: req.body.productName,
                brandId: mongoose.Types.ObjectId(req.body.brandId),
                price: req.body.price,
                salePrice: req.body.salePrice,
                size: req.body.size,
                quantity: req.body.quantity,
                description: req.body.description,
                productImage: productImage,
            }
        } else {
            var updateProduct = await {
                SKU: req.body.SKU,
                productName: req.body.productName,
                brandId: mongoose.Types.ObjectId(req.body.brandId),
                price: req.body.price,
                salePrice: req.body.salePrice,
                size: req.body.size,
                quantity: req.body.quantity,
                description: req.body.description,
            }
        }
        Product.updateOne({ _id: req.params.id }, updateProduct)
            .then(() => res.redirect('/admin/product'))
            .catch(next);
    }
}

module.exports = new ProductController;
