const express = require('express');
const router = express.Router();
const usersController = require('../messages/messagesController.js');

router.get('/', messagesController.getMessages);

module.exports = router;