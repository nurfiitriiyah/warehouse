const express = require('express');
const router = express.Router();
const controller = require("../../controller/controller_menu/menu")

router.get('/list', controller.getMenu)

module.exports = router;
