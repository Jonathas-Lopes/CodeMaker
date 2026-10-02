const express = require('express');
const router = express.Router();
const faqController = require('../controller/faqController');
const faqValidation = require('../middleware/faqValidation');

router.get('/', faqController.listar);
router.get('/novo', faqController.exibirFormulario);
router.post('/salvar', faqValidation, faqController.salvar);
router.post('/excluir/:id', faqController.excluir);

module.exports = router;