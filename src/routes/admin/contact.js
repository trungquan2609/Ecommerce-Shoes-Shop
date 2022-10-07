const express = require('express');
const router = express.Router();

const ContactController = require('../../app/controllers/admin/ContactController');

router.get('/:id', ContactController.confirm);

router.get('/', ContactController.index);

module.exports = router;
