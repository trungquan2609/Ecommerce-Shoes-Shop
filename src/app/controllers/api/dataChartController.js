const Receipt = require('../../models/receipt_model');

class dataChartController {

    // Get /admin/index
    async dataTotal(req, res, next) {
        var from = new Date(req.query.from ? req.query.from : '2020-01-01')
        var to = new Date(req.query.to ? req.query.to : Date.now())
        to.setHours(23,59,59,9999)
        // console.log(to)
        Receipt.aggregate([
            { $match: { 
                createdAt: { $gte: from, $lte: to}
            }      
            },
            {$group: {
                _id: { 
                    day: { $dayOfMonth: {date:"$createdAt", timezone:'Asia/Bangkok'}}, 
                    month: {$month: {date:"$createdAt", timezone:'Asia/Bangkok'}}, 
                    year: {$year: {date:"$createdAt", timezone:'Asia/Bangkok'}},
                },
                total: {$sum: "$receipt"}
            }},
        ])
        .then(rs => res.json(rs))
        
    }

    async dataByMonth(req, res, next) {
        Receipt.aggregate([
            {$group: {
                _id: { month: {$month: "$createdAt"}, year: {$year: "$createdAt"}},
                total: {$sum: "$receipt"}
            }}
        ])
        .then(rs => res.json(rs))
    }



}

module.exports = new dataChartController;
