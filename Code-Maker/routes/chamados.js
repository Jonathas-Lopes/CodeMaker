const express = require('express');
const router = express.Router();

const chamadosController = require('../controller/chamadosController.js');
const validarChamado = require('../middleware/chamadosValidation');

router.get('/', chamadosController.getChamados);

router.get('/novo', chamadosController.getNovoChamado);

router.post(
    '/salvar',
    validarChamado,
    chamadosController.salvarChamado
);

router.post(
    '/excluir/:id',
    chamadosController.excluirChamado
);

module.exports = router;