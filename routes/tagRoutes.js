const express = require("express");
const controller = require("../controllers/tagControllers.js");

const router = express.Router();

router.get('/', controller.getTags);
router.post('/', controller.addTag);
router.delete('/:id', controller.deleteTag);

router.get('/material', controller.getMaterialTags);
router.get('/colour', controller.getColourTags);
router.get('/general', controller.getGeneralTags);

module.exports = router;
