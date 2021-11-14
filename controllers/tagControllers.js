const Tag = require('../models/Tag.js');

const getTags = async (req, res) => {
	try {
		const tags = await Tag.findAll();
		res.status(200).json(tags);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const addTag = async (req, res) => {
	try {
		const data = req.body.data;
		await Tag.create(data);
		res.sendStatus(201);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

module.exports = {
	getTags,
	addTag,
};
