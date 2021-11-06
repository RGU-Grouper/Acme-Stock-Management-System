import TagList from "./tag-list.js";

export default class StockItem {
	constructor(materialTags, colourTags, data) {
		this.id = "";
		this.name = "";
		this.quantity = 0;
		this.images = [];
		this.tagLists = {
			materials: new TagList("materials", materialTags),
			mainColours: new TagList("mainColours", colourTags),
			highlightColours: new TagList("highlightColours", colourTags),
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
				materials: this.tagLists.materials.getCurrentTags(),
				mainColours: this.tagLists.mainColours.getCurrentTags(),
				highlightColours: this.tagLists.highlightColours.getCurrentTags(),
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
			tagList.forEach(tag => {
				this.tagLists[key].addTag(tag);
			});
		});
	}
}
