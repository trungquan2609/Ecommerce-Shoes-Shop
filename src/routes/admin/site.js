const express = require('express');
const router = express.Router();

const adminController = require('../../app/controllers/admin/AdminController');

router.get('/admin', adminController.index);

module.exports = router;
