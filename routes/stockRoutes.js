const express = require("express");
const controller = require("../controllers/stockControllers.js");

const router = express.Router();

router.post('/', controller.addStockItem);
router.post('/image', controller.addStockImages);

router.get('/', controller.getStockData);
router.get('/:id', controller.getStockItem);
router.patch('/:id', controller.updateStockItem);
router.delete('/:id', controller.deleteStockItem);

module.exports = router;
