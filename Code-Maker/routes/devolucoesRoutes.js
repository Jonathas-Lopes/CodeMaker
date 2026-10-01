const express = require('express');
const router = express.Router();
const devolucoesController = require('../controller/devolucoesController');
const devolucoesValidation = require('../middleware/devolucoesValidation');

router.get('/', devolucoesController.listar);
router.get('/novo', devolucoesController.exibirFormulario);
router.post('/salvar', devolucoesValidation, devolucoesController.salvar);
router.post('/excluir/:id', devolucoesController.excluir);

module.exports = router;
