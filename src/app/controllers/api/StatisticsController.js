const Order = require('../../models/order_model')

class Statistics {
    async index(req, res, next) {
        var from = new Date(req.query.from ? req.query.from : '2022-01-01')
        from.setHours(0,0,0,0)
        var to = new Date(req.query.to ? req.query.to : Date.now())
        to.setHours(23,59,59,9999)
        var material = req.query.material
        var sexual = req.query.sexual
        var order = await Order.find({$and:[{createdAt: {$gte:from}}, {createdAt:{$lte:to}}]})
        var data = []
        for ( var i in order ) {
            var productId = order[i].productId
            for (var j in productId) {
                var product = productId[j]
                data.push(product)
            }
        }

        for ( var m = 0; m <= data.length; m++ ) {
            var n = m + 1
            for ( n ; n <= data.length; n++) {
                var SKU1 = data[m].item.SKU
                var SKU2 = data[n]?.item.SKU
                var size1 = data[m].item.size
                var size2 = data[n]?.item.size
                if ( SKU1 == SKU2 && size1 == size2 ) {
                    data[m].qty += data[n].qty;
                    data.splice(n, 1);
                    n = m + 1
                }
            }
        }

        if ( material != 'undefined' && sexual != 'undefined' ) {
            data = data.filter(e => e.item.material == material && e.item.sexual == sexual)
            console.log('có chọn chất liệu có chọn loại giày')
            return res.json(data);
        }
        if ( material != 'undefined' && sexual == 'undefined' ) {
            data = data.filter(e => e.item.material == material)
            console.log('có chọn chất liệu không chọn loại giày')
            return res.json(data);
        }
        if ( material == 'undefined'  && sexual != 'undefined' ){
            data = data.filter(e => e.item.sexual == sexual)
            console.log('không chọn chất liệu có chọn loại giày')
            return res.json(data);
        }
        
        res.json(data)
    }
}

module.exports = new Statistics