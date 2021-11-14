const express = require("express");
const controller = require("../controllers/tagControllers.js");

const router = express.Router();

router.get('/', controller.getTags);
router.post('/', controller.addTag);

module.exports = router;
