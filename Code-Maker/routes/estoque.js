const express = require('express');
const router = express.Router();
const estoqueController = require('../controller/estoqueController.js');

router.get('/', estoqueController.getEstoque);

module.exports = router;