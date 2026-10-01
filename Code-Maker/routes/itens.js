const express = require('express');
const router = express.Router();
const itensController = require('../controller/itensController.js');

router.get('/', itensController.getItens);

module.exports = router;