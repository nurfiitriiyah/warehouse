const express = require('express');
const router = express.Router();
const controller = require("../../controller/controller_inv/inv")

router.get('/', controller.getInv)
router.get('/list', controller.getListInv)
router.get('/detail', controller.getDetail)
router.post('/insert', controller.insertInv)

module.exports = router;
