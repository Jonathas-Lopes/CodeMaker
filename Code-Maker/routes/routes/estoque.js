const express = require('express');
const router = express.Router();

const estoqueController = require('../../controller/estoqueController');
const validarEstoque = require('../../middleware/estoqueValidation');

// Consultar estoque
router.get('/', estoqueController.consultar);

// Abrir formulário
router.get('/novo', estoqueController.novo);

// Salvar produto
router.post('/salvar', validarEstoque, estoqueController.salvar);

// Excluir produto
router.post('/excluir/:id', estoqueController.excluir);

module.exports = router;