const express = require('express');
const router = express.Router();

const dataChartController = require('../../app/controllers/api/dataChartController.js');

router.get('/dataTotal/databymonth', dataChartController.dataByMonth)

router.get('/dataTotal', dataChartController.dataTotal);

module.exports = router;