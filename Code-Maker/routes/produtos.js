const express = require('express');
const router = express.Router();
const produtosController = require('../controller/produtosController.js');

router.get('/', produtosController.getProdutos);

module.exports = router;