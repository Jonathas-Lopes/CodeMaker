const express = require('express');

const router = express.Router();

const faqController =
    require('../controller/faqController.js');


// CONSULTA
router.get(
    '/',
    faqController.getFaqs
);


// TELA DE INSERÇÃO
router.get(
    '/inserir',
    faqController.getInserir
);


// CADASTRAR
router.post(
    '/inserir',
    faqController.postInserir
);

router.get(
    '/excluir',
    faqController.getExcluir
);

router.post(
    '/excluir/:id',
    faqController.postExcluir
);

module.exports = router;