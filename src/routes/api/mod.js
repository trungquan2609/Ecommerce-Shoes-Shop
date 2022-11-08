const express = require('express');
const router = express.Router();
const Modcontroller = require('../../app/controllers/api/ModController.js');

router.get('/deleteMod', Modcontroller.delete);

module.exports = router;