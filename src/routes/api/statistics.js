const express = require('express');
const router = express.Router();

const StatisticsController = require('../../app/controllers/api/StatisticsController');


router.get('/', StatisticsController.index);

module.exports = router;