const Fabric = require('../models/Fabric.js');
const FabricTag = require('../models/FabricTag.js');
const Tag = require('../models/Tag.js');

const createTagList = (tagLists) => {
	const tags = [];
	
	if (tagLists.material) {
		for (let i = 0; i < data.tagLists.material.length; i++) {
			const tag = data.tagLists.material[i];
			tags.push({ id: tag.id, name: tag.name, category: "material" });
		}
	}
	
	if (tagLists.colour) {
		for (let i = 0; i < data.tagLists.colour.length; i++) {
			const tag = data.tagLists.colour[i];
			tags.push({ id: tag.id, name: tag.name, category: "colour" });
		}
	}
	
	if (tagLists.general) {
		for (let i = 0; i < data.tagLists.general.length; i++) {
			const tag = data.tagLists.general[i];
			tags.push({ id: tag.id, name: tag.name, category: "general" });
		}
	}

	return tags;
};

const getStockData = async (req, res) => {
	try {
		const stock = await Fabric.findAll();
		for (let i = 0; i < stock.length; i++) {
			const fabric = stock[i];
			const fabricTags = await FabricTag.findAll({ where: { fabricId: fabric.id } });
			fabric.tagLists = {
				material: fabricTags.filter(tag => tag.category === "material"),
				colour: fabricTags.filter(tag => tag.category === "colour"),
				general: fabricTags.filter(tag => tag.category === "general"),
			};
		}
		res.status(200).json(stock);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const addStockItem = async (req, res) => {
	try {
		const data = req.body;
		const tags = (data.tagLists) ? createTagList(data.tagLists) : [];

		// Fabric
		const { name, quantity, image1, image2 } = data;
		const fabric = await Fabric.create({ name, quantity, image1, image2 });

		// Tags
		for (let i = 0; i < tags.length; i++) {
			const tag = tags[i];
			
			// if tag has no id then add to tag list
			if (!tag.id) {
				const newTag = await Tag.create({ name: tag.name, category: tag.category });
				tag.id = newTag.id;
			}

			await FabricTag.create({ fabricId: fabric.id, tagId: tag.id });
		}

		// Respond to client - 201 Resource Created
		res.sendStatus(201);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);	// 500 - Internal Server Error
	}
};

const getStockItem = async (req, res) => {
	try {
		const id = req.params.id;
		const fabric = await Fabric.findOne({ where: { id } });
		const fabricTags = await FabricTag.findAll({ where: { fabricId: fabric.id } });

		fabric.tagLists = {
			material: fabricTags.filter(tag => tag.category === "material"),
			colour: fabricTags.filter(tag => tag.category === "colour"),
			general: fabricTags.filter(tag => tag.category === "general"),
		};

		res.status(200).json(fabric);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

const updateStockItem = async (req, res) => {
	const id = req.params.id;
	const data = req.body;
	const tags = (data.tagLists) ? createTagList(data.tagLists) : [];

	const fabric = await Fabric.findOne({ where: { id } });
	const fabricTags = await FabricTag.findAll({ where: { fabricId: fabric.id } });

	// Update Details and Images
	if (data.name) fabric.name = data.name;
	if (data.quantity) fabric.quantity = data.quantity;
	if (data.image1) fabric.image1 = data.image1;
	if (data.image2) fabric.image2 = data.image2;

	// Existing Tags
	for (let i = 0; i < fabricTags.length; i++) {
		const tag = fabricTags[i];
		// if tag is in fabric but not data then delete
		if (!tags.find(t => t.id === tag.id)) {
			await FabricTag.destroy({ where: { id: tag.id } });
		}
	}
	
	// Update Tags
	for (let i = 0; i < tags.length; i++) {
		const tag = tags[i];
		if (!tag.id) {
			// if tag has no id then add to tag list
			const newTag = await Tag.create({ name: tag.name, category: "material" });
			await FabricTag.create({ fabricId: fabric.id, tagId: newTag.id });
		}
		else {
			// if tag is in data but not fabric then add
			if (!fabricTags.find(t => t.id === tag.id)) {
				await FabricTag.create({ fabricId: fabric.id, tagId: tag.id });
			}
		}
	}

	await fabric.save();
	res.sendStatus(200);
};

const deleteStockItem = async (req, res) => {
	try {
		const id = req.params.id;
		await Fabric.destroy({ where: { id } });
		res.sendStatus(200);
	}
	catch(error) {
		console.error(error.message);
		res.sendStatus(500);
	}
};

module.exports = {
	getStockData,
	addStockItem,
	getStockItem,
	updateStockItem,
	deleteStockItem,
};
