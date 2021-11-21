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
		const data = req.body;
		await Tag.create(data);
		res.sendStatus(201);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const deleteTag = async (req, res) => {
	try {
		const id = req.params.id;
		await Tag.destroy({ where: { id } });
		res.sendStatus(200);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const getMaterialTags = async (req, res) => {
	try {
		const tags = await Tag.findAll({ where: { category: "material" } });
		res.status(200).json(tags);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const addMaterialTag = async (req, res) => {
	try {
		const data = req.body;
		data.category = "material";
		await Tag.create(data);
		res.sendStatus(201);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const getColourTags = async (req, res) => {
	try {
		const tags = await Tag.findAll({ where: { category: "colour" } });
		res.status(200).json(tags);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const addColourTag = async (req, res) => {
	try {
		const data = req.body;
		data.category = "colour";
		await Tag.create(data);
		res.sendStatus(201);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const getGeneralTags = async (req, res) => {
	try {
		const tags = await Tag.findAll({ where: { category: "general" } });
		res.status(200).json(tags);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const addGeneralTag = async (req, res) => {
	try {
		const data = req.body;
		data.category = "general";
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
	deleteTag,
	getMaterialTags,
	addMaterialTag,
	getColourTags,
	addColourTag,
	getGeneralTags,
	addGeneralTag,
};
