
const express = require('express');
const router = express.Router();

const ContactController = require('../../app/controllers/site/ContactController');

router.get('/success', ContactController.success);

router.post('/', ContactController.sendContact);

router.get('/', ContactController.contact);

module.exports = router;
