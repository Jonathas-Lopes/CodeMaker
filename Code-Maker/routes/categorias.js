const express = require('express');
const router = express.Router();
const categoriasController = require('../controller/categoriasController.js');

router.get('/', categoriasController.getCategorias);
router.get('/novo', categoriasController.getNovo);
router.post('/salvar', categoriasController.postSalvar);
router.post('/excluir/:id', categoriasController.postExcluir);

module.exports = router;