const express = require('express');
const router = express.Router();
const data = {};
const authController = require('../../controllers/authcontroller');

router.post('/',authController.handleAuth);

module.exports = router;