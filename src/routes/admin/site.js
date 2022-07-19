const express = require('express');
const router = express.Router();

const adminController = require('../../app/controllers/admin/AdminController');

router.get('/', adminController.index);

module.exports = router;
