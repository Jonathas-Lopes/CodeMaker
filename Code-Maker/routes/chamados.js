const express = require('express');
const router = express.Router();
const chamadosController = require('../controller/chamadosController.js');

router.get('/', chamadosController.getChamados);

module.exports = router;