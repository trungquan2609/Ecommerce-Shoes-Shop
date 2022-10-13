const Order = require('../../models/order_model')

class Statistics {
    async index(req, res, next) {
        var from = new Date(req.query.from ? req.query.from : '2022-10-12')
        var to = new Date(req.query.to ? req.query.to : Date.now())
        var material = req.query.material ? req.query.material : 'Da' 
        var sexual = req.query.sexual ? req.query.sexual : 'Nữ'
        var order = await Order.find({$and:[{createdAt: {$gte:from}}, {createdAt:{$lte:to}}]})
        var data = []
        for ( var i in order ) {
            var product = order[i].productId
            for (var j in product) {
                var product2 = product[j]
                if (product2.item.material == material && product2.item.sexual == sexual) {
                    data.push(product2)
                }
            }
        }
        res.render('admin/statistics/index', {
            layout: 'layout_admin.hbs',
            data
        })
        
    }
}

module.exports = new Statistics