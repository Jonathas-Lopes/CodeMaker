const express = require('express');
const router = express.Router();
const categoriasController = require('../controller/categoriasController.js');
const categoriasValidation = require('../controller/middleware/categoriasValidation.js');

router.get('/', categoriasController.getCategorias);
router.get('/novo', categoriasController.getNovo);
router.post('/salvar', categoriasValidation, categoriasController.postSalvar);
router.post('/excluir/:id', categoriasController.postExcluir);

module.exports = router;
