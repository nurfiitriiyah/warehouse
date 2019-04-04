const express = require('express');
const router = express.Router();
const controller = require("../../controller/controller_login/login")

router.get('/', controller.checkID)
router.post('/', controller.setID);

module.exports = router;
