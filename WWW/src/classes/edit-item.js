import StockItem from "./stock-item.js";

export default class EditItem extends StockItem {
	constructor(materialTags, colourTags, itemData) {
		super(materialTags, colourTags, itemData);

		this.materialTags = materialTags;
		this.colourTags = colourTags;

		// Get references to DOM
		this.$tagTemplate = document.getElementById("tag-template");
		
		this.$header = document.querySelector(".header");
		this.$background = document.querySelector(".edit-item__background");
		this.$editItem = document.querySelector(".edit-item");
		this.$cancel = document.querySelector(".edit-item__cancel");

		this.$imageFiles = document.querySelectorAll(".edit-item__image-file");

		this.$nameInput = document.querySelector(".edit-item__name-input");
		this.$quantityInput = document.querySelector(".edit-item__quantity-input");

		this.$materialSelectList = document.querySelector(".edit-item__material-select");
		this.$materialInput = document.querySelector(".edit-item__material-input");
		this.$materialDisplayList = document.querySelector(".edit-item__material-display");
		
		this.$mainColourSelectList = document.querySelector(".edit-item__main-colour-select");
		this.$mainColourInput = document.querySelector(".edit-item__main-colour-input");
		this.$mainColourDisplayList = document.querySelector(".edit-item__main-colour-display");
		
		this.$highlightColourSelectList = document.querySelector(".edit-item__highlight-colour-select");
		this.$highlightColourInput = document.querySelector(".edit-item__highlight-colour-input");
		this.$highlightColourDisplayList = document.querySelector(".edit-item__highlight-colour-display");

		this.$submitButton = document.querySelector(".edit-item__submit");

		// Set up UI
		this.loadMaterialSelectTags(materialTags);
		this.loadMainColourSelectTags(colourTags);
		this.loadHighlightColourSelectTags(colourTags);


		// Image Preview Selector
		this.$imageFiles.forEach($imageFile => {
			$imageFile.addEventListener("click", this.selectImagePreview);
		});

		// Update data as user inputs
		this.$nameInput.addEventListener("input", this.setName.bind(this));
		this.$quantityInput.addEventListener("input", this.setQuantity.bind(this));

		// Show tag filter boxes when corresponding input box is clicked, hide others
		this.$materialInput.addEventListener("click", this.showMaterialSelectList.bind(this));
		this.$mainColourInput.addEventListener("click", this.showMainColourSelectList.bind(this));
		this.$highlightColourInput.addEventListener("click", this.showHighlightColourSelectList.bind(this));

		// Refresh the select tags list when one is selected
		this.$materialInput.addEventListener("input", this.loadMaterialSelectTags.bind(this));
		this.$mainColourInput.addEventListener("input", this.loadMainColourSelectTags.bind(this));
		this.$highlightColourInput.addEventListener("input", this.loadHighlightColourSelectTags.bind(this));
		
		// Submit the new item data
		this.$submitButton.addEventListener("click", this.submitData.bind(this));


		// Hide edit item when background is clicked
		this.$background.addEventListener("click", this.hide.bind(this));

		// Close all filter boxes when clicking outside of the box
		this.$editItem.addEventListener("click", (event) => {
			event.stopPropagation()
			this.hideAllTagSelectLists();
		});

		this.$cancel.addEventListener("click", (event) => {
			this.hide();
		});
		
		// Show existing data in UI
		if (itemData) {
			this.$nameInput.value = itemData.name;
			this.$quantityInput.value = itemData.quantity;
			itemData.tagLists.materials.forEach(tag => this.addMaterialTag(tag));
			itemData.tagLists.mainColours.forEach(tag => this.addMainColourTag(tag));
			itemData.tagLists.highlightColours.forEach(tag => this.addHighlightColourTag(tag));
		}
	}

	show(itemData) {
		this.$background.classList.add("edit-item__background--active");
		this.$header.classList.add("header--hidden");
	}

	hide() {
		this.$background.classList.remove("edit-item__background--active");
		this.$header.classList.remove("header--hidden");
	}

	createTagSelectItem(tag, addTagCallback) {
		const $tagSelect = document.createElement("li");
		$tagSelect.classList.add("tag-select");
		$tagSelect.innerText = tag;
		$tagSelect.addEventListener("click", addTagCallback);
		return $tagSelect;
	}

	createTagDisplayItem(tag, removeTagCallback) {
		const $tagDisplay = this.$tagTemplate.content.cloneNode(true).firstElementChild;
		const $tagName = $tagDisplay.querySelector(".tag__name");
		const $tagRemove = $tagDisplay.querySelector(".tag__remove");
		
		$tagName.innerText = tag;
		$tagRemove.addEventListener("click", removeTagCallback);
		
		return $tagDisplay;
	}

	setName(name) {
		super.setName(name);
		this.$nameInput.value = name;
	}
	
	setQuantity(quantity) {
		super.setQuantity(quantity);
		this.$quantityInput.value = quantity;
	}

	hideAllTagSelectLists(event) {
		this.$materialSelectList.classList.remove("edit-item__material-select--active");
		this.$mainColourSelectList.classList.remove("edit-item__main-colour-select--active");
		this.$highlightColourSelectList.classList.remove("edit-item__highlight-colour-select--active");
	}

	selectImagePreview(event) {
		const $selectedImageFile = document.querySelector(".edit-item__image-file--active");
		$selectedImageFile.classList.remove("edit-item__image-file--active");
		this.classList.add("edit-item__image-file--active");
	}

	// Material Tags
	loadMaterialSelectTags() {
		// Remove all tags from the list
		while (this.$materialSelectList.firstChild) {
			this.$materialSelectList.removeChild(this.$materialSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$materialInput.value;
		const filteredTags = this.tagLists.materials.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.addMaterialTag.bind(this));
			this.$materialSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addMaterialTag.bind(this));
		this.$materialSelectList.appendChild($addNewTag);
	}

	showMaterialSelectList(event) {
		event.stopPropagation();
		this.$mainColourSelectList.classList.remove("edit-item__main-colour-select--active");
		this.$highlightColourSelectList.classList.remove("edit-item__highlight-colour-select--active");
		this.$materialSelectList.classList.add("edit-item__material-select--active");
	}

	addMaterialTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$materialInput.value : tagName;
		this.$materialInput.focus();
		if (!tag) return;

		this.tagLists.materials.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeMaterialTag.bind(this));
		this.$materialDisplayList.appendChild($tagDisplay);
		
		this.$materialInput.value = "";
		this.loadMaterialSelectTags();
	}

	removeMaterialTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag__name");
		const tag = $tagName.innerText;
		this.tagLists.materials.removeTag(tag);

		this.$materialDisplayList.removeChild(event.target.parentElement);
		this.loadMaterialSelectTags();
	}

	// Main Colour Tags
	loadMainColourSelectTags() {
		// Remove all tags from the list
		while (this.$mainColourSelectList.firstChild != null) {
			this.$mainColourSelectList.removeChild(this.$mainColourSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$mainColourInput.value;
		const filteredTags = this.tagLists.mainColours.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.addMainColourTag.bind(this));
			this.$mainColourSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addMainColourTag.bind(this));
		this.$mainColourSelectList.appendChild($addNewTag);
	}

	showMainColourSelectList(event) {
		event.stopPropagation();
		this.$materialSelectList.classList.remove("edit-item__material-select--active");
		this.$highlightColourSelectList.classList.remove("edit-item__highlight-colour-select--active");
		this.$mainColourSelectList.classList.add("edit-item__main-colour-select--active");
	}

	addMainColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$mainColourInput.value : tagName;
		this.$mainColourInput.focus();
		if (!tag) return;

		this.tagLists.mainColours.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeMainColourTag.bind(this));
		this.$mainColourDisplayList.appendChild($tagDisplay);

		this.$mainColourInput.value = "";
		this.loadMainColourSelectTags();
	}

	removeMainColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag__name");
		const tag = $tagName.innerText;
		this.tagLists.mainColours.removeTag(tag);

		this.$mainColourDisplayList.removeChild(event.target.parentElement);
		this.loadMainColourSelectTags();
	}

	// Highlight Colour Tags
	loadHighlightColourSelectTags() {
		// Remove all tags from the list
		while (this.$highlightColourSelectList.firstChild != null) {
			this.$highlightColourSelectList.removeChild(this.$highlightColourSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$highlightColourInput.value;
		const filteredTags = this.tagLists.highlightColours.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.addHighlightColourTag.bind(this));
			this.$highlightColourSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addHighlightColourTag.bind(this));
		this.$highlightColourSelectList.appendChild($addNewTag);
	}

	showHighlightColourSelectList(event) {
		event.stopPropagation();
		this.$materialSelectList.classList.remove("edit-item__material-select--active");
		this.$mainColourSelectList.classList.remove("edit-item__main-colour-select--active");
		this.$highlightColourSelectList.classList.add("edit-item__highlight-colour-select--active");
	}

	addHighlightColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$highlightColourInput.value : tagName;
		this.$highlightColourInput.focus();
		if (!tag) return;

		this.tagLists.highlightColours.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeHighlightColourTag.bind(this));
		this.$highlightColourDisplayList.appendChild($tagDisplay);

		this.$highlightColourInput.value = "";
		this.loadHighlightColourSelectTags();
	}

	removeHighlightColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag__name");
		const tag = $tagName.innerText;
		this.tagLists.highlightColours.removeTag(tag);

		this.$highlightColourDisplayList.removeChild(event.target.parentElement);
		this.loadHighlightColourSelectTags();
	}

	// Submit New Item
	submitData(event) {
		console.log(this.getData());
	}
}
