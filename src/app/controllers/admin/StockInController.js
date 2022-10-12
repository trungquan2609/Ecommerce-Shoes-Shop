const multer = require('multer');
const XLSX = require('xlsx');
const Product = require('../../models/product_model')
const StockIn = require('../../models/stockin_model')
const Brand = require('../../models/brand_model')

class StockInController {

    //GET admin/stockin
    async index(req, res, next) {
        const list = await StockIn.find().sort({createdAt : -1}).populate('adminId')
        res.render('admin/storage/index', {
            title: 'Nhập hàng',
            style: ['app'],
            script: ['dataTables'],
            layout: 'layout_admin.hbs',
            list
        })
    }

    //GET admin/stockin/addstockin
    add(req, res, next) {
        
        res.render('admin/storage/add', {
            title: 'Nhập hàng',
            style: ['app'],
            script: ['dataTables'],
            layout: 'layout_admin.hbs',
        })
    }

    async save(req, res, next) {
        var workbook = XLSX.readFile(req.file.destination + '/' + req.file.filename)
        var data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        for ( var i in data ) {
            if ( !data[i].currentPrice) {
                data[i].currentPrice = data[i].salePrice ? data[i].salePrice : data[i].price
            }
            var product = await Product.find({$and: [{SKU: data[i].SKU}, {size: data[i].size}]})
            if ( product.length > 0 ) {
                var update = await Product.updateOne({_id: product[0]._id}, {$set:{quantity: (product[0].quantity + data[i].quantity)}})
            } 
            else {
                var update = new Product(data[i])
                update.save()
            }
        }
        var dataStockIn = new StockIn({
            adminId: req.user._id,
            file: req.file,
            data
        })
        dataStockIn.save()
        res.redirect('/admin/stockin')
    }

    async detail(req, res, next) {
        var product = await StockIn.findById(req.params.id).populate({path: 'data', populate: {path: 'brandId'}})
        // res.json(product)
        res.render('admin/storage/detail', {
            title: 'Chi tiết danh sách',
            style: ['app', 'image'],
            script: ['dataTables'],
            layout: 'layout_admin.hbs',
            product,
        })
    }
}

module.exports = new StockInController
