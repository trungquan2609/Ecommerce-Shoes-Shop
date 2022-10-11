const express = require('express');
const router = express.Router();
const Modcontroller = require('../../app/controllers/api/Modcontroller');

router.get('/deleteMod', Modcontroller.delete);

module.exports = router;