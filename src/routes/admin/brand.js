const express = require('express');
const router = express.Router();
const upload = require('../../config/uploadBrand');

const brandController = require('../../app/controllers/admin/BrandController');

router.patch('/edit/:id', upload.single('brandImage'), brandController.update)

router.get('/edit/:id', brandController.edit);

router.post('/add', upload.single('brandImage'),  brandController.store);

router.get('/add', brandController.add);

router.delete('/delete/:id', brandController.delete);

router.get('/', brandController.index);

module.exports = router;