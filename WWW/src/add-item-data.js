export default class AddItem {
	constructor() {
		this.name = "";
		this.materials = [];
		this.mainColours = [];
		this.highlightColours = [];
		this.quantity = 0;
	}

	// New Item Details
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
		this.quantity = quantity;
	}

	// Material Tags
	getMaterialTags() {
		return this.materials;
	}
	addMaterialTag(tag) {
		this.materials.push(tag);
	}
	removeMaterialTag(tag) {
		this.materials = this.materials.filter(t => t != tag);
	}

	// Main Colour Tags
	getMainColourTags() {
		return this.mainColours;
	}
	addMainColourTag(tag) {
		this.mainColours.push(tag);
	}
	removeMainColourTag(tag) {
		this.mainColours = this.mainColours.filter(t => t != tag);
	}

	// Highlight Colour Tags
	getHighlightColourTags() {
		return this.highlightColours;
	}
	addHighlightColourTag(tag) {
		this.highlightColours.push(tag);
	}
	removeHighlightColourTag(tag) {
		this.highlightColours = this.highlightColours.filter(t => t != tag);
	}

	// Get New Item Data
	getData() {
		return {
			name: this.name,
			materials: this.materials,
			mainColours: this.mainColours,
			highlightColours: this.highlightColours,
			quantity: this.quantity,
		};
	}
}
