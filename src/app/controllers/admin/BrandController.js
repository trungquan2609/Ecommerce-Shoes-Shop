const Brand = require('../../models/brand_model');
const multer = require('multer');


class BrandController {
    //GET /brand/show
    index(req, res, next) {
        Brand.find()
            .then(brand => res.render('admin/brand/show', {
                title: 'Thương hiệu',
                layout: 'layout_admin.hbs',
                brand: brand
            }))
    }

    //GET /brand/add
    add(req, res, next) {
        res.render('admin/brand/add', {
            title: 'Thêm thương hiệu',
            layout: 'layout_admin.hbs',
        })
    }

    //Delete /brand/delete
    delete(req, res, next) {
        Brand.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    store(req, res, next) {
        if (req.file) {
            var brandImage = req.file.filename;
        }
        const storeBrand = {
            brandName: req.body.brandName,
            brandImage: brandImage,
        }
        const brand = new Brand(storeBrand)
        brand.save()
            .then(() => res.redirect('/admin/brand'))
            .catch(next)
    }

    edit(req, res, next) {
        
        Brand.findById( req.params.id )
            .then(brand =>res.render('admin/brand/edit', {
                title: 'Sửa thương hiệu',
                style: ['app'],
                script: ['dataTables'],
                layout: 'layout_admin.hbs',
                brand: brand,
            }))
    }

    //POST /admin/editbrand
    async update(req, res, next) {
        if (req.file) {
            var brandImage = req.file.filename;
            var updateBrand = await {
                brandName: req.body.brandName,
                brandImage: brandImage,
            }
        } else {
            var updateBrand = await {
                brandName: req.body.brandName,
            }
        }
        Brand.updateOne({ _id: req.params.id }, updateBrand)
            .then(() => res.redirect('/admin/brand'))
            .catch(next);
    }
}

module.exports = new BrandController;
