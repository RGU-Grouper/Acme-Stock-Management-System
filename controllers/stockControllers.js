const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Fabric = require('../models/Fabric.js');
const FabricTag = require('../models/FabricTag.js');
const Tag = require('../models/Tag.js');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	const fileTypes = /jpeg|jpg|png|gif/;
	const extName = fileTypes.test(path.extname(file.originalname.toLowerCase()));
	const mimeType = fileTypes.test(file.mimetype);

	if (extName && mimeType) {
		return cb(null, true);
	}
	else {
		return cb("Error: Unexpected file type.");
	}
};

const upload = multer({
	storage,
	limits: { fileSize: 1024 * 1024 * 10 },
	fileFilter,
});

const uploadImages = upload.fields([
	{ name: 'image1', maxCount: 1 },
	{ name: 'image2', maxCount: 1 },
]);

const createTagList = (tagLists) => {
	const tags = [];
	
	if (tagLists.material) {
		for (let i = 0; i < tagLists.material.length; i++) {
			const tag = tagLists.material[i];
			tags.push({ id: tag.id, name: tag.name, category: "material" });
		}
	}
	
	if (tagLists.colour) {
		for (let i = 0; i < tagLists.colour.length; i++) {
			const tag = tagLists.colour[i];
			tags.push({ id: tag.id, name: tag.name, category: "colour" });
		}
	}
	
	if (tagLists.general) {
		for (let i = 0; i < tagLists.general.length; i++) {
			const tag = tagLists.general[i];
			tags.push({ id: tag.id, name: tag.name, category: "general" });
		}
	}

	return tags;
};

const getStockData = async (req, res) => {
	try {
		const stock = await Fabric.findAll();
		for (let i = 0; i < stock.length; i++) {
			const fabricTags = await FabricTag.findAll({ where: { fabricId: stock[i].id } });

			const tags = [];
			for (let i = 0; i < fabricTags.length; i++) {
				const id = fabricTags[i].dataValues.tagId;
				const tag = await Tag.findOne({ where: { id } });
				tags.push(tag);
			}

			stock[i].dataValues.tagLists = {
				material: tags.filter(tag => tag.dataValues.category === "material"),
				colour: tags.filter(tag => tag.dataValues.category === "colour"),
				general: tags.filter(tag => tag.dataValues.category === "general"),
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
		const tags = (req.body.tagLists) ? createTagList(req.body.tagLists) : [];

		// Fabric
		const { name, quantity, image1, image2 } = req.body;
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
		console.error(error);
		res.sendStatus(500);	// 500 - Internal Server Error
	}
};

const addStockImages = async (req, res) => {
	uploadImages(req, res, (err) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		}
		else {
			res.sendStatus(200);
		}
	});
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
		if (tag.id) {
			if (!tags.find(t => t.id === tag.dataValues.tagId)) {
				await FabricTag.destroy({ where: { id: tag.dataValues.tagId } });
			}
		}
	}
	
	// Update Tags
	for (let i = 0; i < tags.length; i++) {
		const tag = tags[i];
		if (!tag.id) {
			// if tag has no id then add to tag list
			const newTag = await Tag.create({ name: tag.name, category: tag.category });
			await FabricTag.create({ fabricId: fabric.id, tagId: newTag.id });
		}
		else {
			// if tag is in data but not fabric then add
			if (!fabricTags.find(t => t.dataValues.tagId === tag.id)) {
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
		const fabric = await Fabric.findOne({ where: { id } });
		const fileName1 = fabric.image1;
		const fileName2 = fabric.image2;
		if (fs.existsSync(`images/${fileName1}`)) fs.unlinkSync(`images/${fileName1}`);
		if (fs.existsSync(`images/${fileName2}`)) fs.unlinkSync(`images/${fileName2}`);
		await FabricTag.destroy({ where: { fabricId: id }});
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
	addStockImages,
	getStockItem,
	updateStockItem,
	deleteStockItem,
};
