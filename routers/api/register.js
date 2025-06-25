const express = require('express');
const router = express.Router();
const data = {};
const registerController = require('../../controllers/registercontroller');

router.post('/',registerController.handelNewUser);

module.exports = router;