const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).json({
		test: "Testing",
		testing: 12,
	});
});

module.exports = router;
