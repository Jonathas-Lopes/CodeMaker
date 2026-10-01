const express = require('express');
const router = express.Router();
const produtosController = require('../controller/produtosController');
const { validarProduto } = require('../middleware/produtosValidation');

router.get('/', produtosController.getProdutos);
router.get('/novo', produtosController.novoProduto);
router.post('/salvar', validarProduto, produtosController.createProduto);
router.post('/excluir/:id', produtosController.deleteProduto);

module.exports = router;