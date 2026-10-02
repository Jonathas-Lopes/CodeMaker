
const express = require('express');
const router = express.Router();

const pedidosController = require('../controller/pedidosController');

router.get('/', pedidosController.index);

router.get('/novo', pedidosController.novo);

router.post('/salvar', pedidosController.salvar);

router.post('/excluir/:id', pedidosController.excluir);

module.exports = router;