const express = require('express');
const router = express.Router();
const controller = require("../../controller/controller_inv/inv")

router.get('/', controller.getInv)
router.post('/insert', controller.insertInv)

module.exports = router;
