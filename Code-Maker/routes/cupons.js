var express = require('express');
var router = express.Router();

const cuponsController = require('../controller/cuponsController');

router.get('/', cuponsController.getCupons);

module.exports = router;