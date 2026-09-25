const express = require('express');
const router = express.Router();
const categoriasController = require('../controller/categoriasController.js');

router.get('/', categoriasController.getCategorias);

module.exports = router;