const express = require('express');
const router = express.Router();
const categoriaController = require('../controller/categoriaontroller.js');

router.get('/', categoriaController.getCategorias);

module.exports = router;