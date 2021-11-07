import EditItem from "./edit-item.js";

export default class AddItem extends EditItem {
	constructor(materialTags, colourTags) {
		super(materialTags, colourTags);
	}
	
	hide() {
		this.$header.classList.remove("header--hidden");
		super.hide();
	}
}
