const express = require('express');
const router = express.Router();
const trocasController = require('../controller/trocasController');
const validarTroca = require('../middleware/validarTroca');

router.get('/', trocasController.listar);
router.get('/nova', trocasController.mostrarFormulario);
router.post('/', validarTroca, trocasController.cadastrar);
router.post('/:id/excluir', trocasController.excluir);

module.exports = router;
