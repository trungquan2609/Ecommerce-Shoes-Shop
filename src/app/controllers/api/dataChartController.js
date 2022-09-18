const Receipt = require('../../models/receipt_model');

class dataChartController {

    // Get /admin/index
    async dataTotal(req, res, next) {
        Receipt.find()
            .then(rs => res.json(rs));
        
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
