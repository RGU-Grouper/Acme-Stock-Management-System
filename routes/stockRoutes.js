const express = require("express");
const controller = require("../controllers/stockControllers.js");

const router = express.Router();

router.get('/', controller.getStockData);
router.post('/', controller.addStockItem);
router.get('/:id', controller.getStockItem);
router.patch('/:id', controller.updateStockItem);
router.delete('/:id', controller.deleteStockItem);

module.exports = router;
