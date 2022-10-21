const Order = require('../../models/order_model')

class Statistics {
    async index(req, res, next) {
        var order = await Order.find()
        var data = []
        for ( var i in order ) {
            var product = order[i].productId
            for (var j in product) {
                var product2 = product[j]
                product2.createdAt = order[i].createdAt
                    data.push(product2)
            }
        }
        res.render('admin/statistics/index', {
            layout: 'layout_admin.hbs',
            data
        })
        
    }
}

module.exports = new Statistics