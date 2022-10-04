const express = require('express');
const router = express.Router();
const upload = require('../../config/uploadFileExcel');

const StockIn = require('../../app/controllers/admin/StockInController');

router.post('/addstockin', upload.single('stock_in-file'), StockIn.save)

router.get('/addstockin', StockIn.add)

router.get('/:id', StockIn.detail)

router.get('/', StockIn.index);

module.exports = router;
