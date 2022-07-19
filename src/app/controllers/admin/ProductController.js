const Product = require('../../models/product_model');
const Brand = require('../../models/brand_model');

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
        res.render('admin/product/add', {
            title: 'Thêm sản phẩm',
            style: ['app'],
            script: ['dataTables'],
            layout: 'layout_admin.hbs',
        })
    }

    //POST /admin/product/store
    store(req, res, next) {
        const product = new Product(req.body)

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
}

module.exports = new ProductController;
