import TagList from "./tag-list.js";

export default class StockItem {
	constructor(materialTags, colourTags, generalTags, data) {
		this.id = "";
		this.name = "";
		this.quantity = 0;
		this.image1 = "",
		this.image2 = "",
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

	getAllCurrentTags() {
		const materialTags = this.tagLists.material.getCurrentTags();
		const colourTags = this.tagLists.colour.getCurrentTags();
		const generalTags = this.tagLists.general.getCurrentTags();
		return materialTags.concat(colourTags).concat(generalTags);
	}

	getData() {
		return {
			id: this.id,
			name: this.name,
			quantity: this.quantity,
			image1: this.image1,
			image2: this.image2,
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
		this.image1 = data.image1;
		this.image2 = data.image2;
		
		if (data.tagLists) {
			Object.keys(data.tagLists).forEach(key => {
				const tagList = data.tagLists[key];
				tagList.forEach(tag => this.tagLists[key].addTag(tag));
			});
		}
	}
}
