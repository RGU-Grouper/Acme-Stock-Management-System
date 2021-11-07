const express = require("express");
const controller = require("../controllers/stockControllers.js");

const router = express.Router();

router.get('/', controller.getStockData);
router.post('/', controller.addStockItem);

module.exports = router;
