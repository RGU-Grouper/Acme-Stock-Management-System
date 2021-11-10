import TagList from "./tag-list.js";

export default class StockItem {
	constructor(materialTags, colourTags, generalTags, data) {
		this.id = "";
		this.name = "";
		this.quantity = 0;
		this.images = [];
		this.tagLists = {
			material: new TagList("material", materialTags),
			colour: new TagList("colour", colourTags),
			general: new TagList("general", generalTags),
		};

		if (data) this.setData(data);
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}
	
	getQuantity() {
		return this.quantity;
	}

	setQuantity(quantity) {
		this.quantity = Number(quantity);
	}

	getData() {
		return {
			id: this.id,
			name: this.name,
			quantity: this.quantity,
			images: this.images,
			tagLists: {
				material: this.tagLists.material.getCurrentTags(),
				colour: this.tagLists.colour.getCurrentTags(),
				general: this.tagLists.general.getCurrentTags(),
			},
		};
	}

	setData(data) {
		this.id = data.id;
		this.name = data.name;
		this.quantity = data.quantity;
		data.images.forEach(image => this.images.push(image));

		Object.keys(data.tagLists).forEach(key => {
			const tagList = data.tagLists[key];
			tagList.forEach(tag => this.tagLists[key].addTag(tag));
		});
	}
}
