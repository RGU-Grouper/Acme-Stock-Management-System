import StockItem from "./stock-item.js";

export default class EditItem extends StockItem {
	constructor(materialTags, colourTags, itemData) {
		super(materialTags, colourTags, itemData);

		this.materialTags = materialTags;
		this.colourTags = colourTags;

		// Get references to DOM
		this.$tagDisplayTemplate = document.getElementById("tag-display-template");
		
		this.$header = document.querySelector(".header");
		this.$editItem = document.querySelector(".edit-item");
		this.$cancel = document.querySelector(".edit-item__cancel");

		this.$imageFiles = document.querySelectorAll(".edit-item__image-file");

		this.$nameInput = document.getElementById("edit-item-name");
		this.$quantityInput = document.getElementById("edit-item-quantity");

		this.$materialsSelectList = document.getElementById("materials-select");
		this.$materialsInput = document.getElementById("materials-input");
		this.$materialsDisplayList = document.getElementById("materials-display");
		
		this.$mainColoursSelectList = document.getElementById("main-colours-select");
		this.$mainColoursInput = document.getElementById("main-colours-input");
		this.$mainColoursDisplayList = document.getElementById("main-colours-display");
		
		this.$highlightColoursSelectList = document.getElementById("highlight-colours-select");
		this.$highlightColoursInput = document.getElementById("highlight-colours-input");
		this.$highlightColoursDisplayList = document.getElementById("highlight-colours-display");

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
		this.$materialsInput.addEventListener("click", this.showMaterialSelectList.bind(this));
		this.$mainColoursInput.addEventListener("click", this.showMainColourSelectList.bind(this));
		this.$highlightColoursInput.addEventListener("click", this.showHighlightColourSelectList.bind(this));

		// Refresh the select tags list when one is selected
		this.$materialsInput.addEventListener("input", this.loadMaterialSelectTags.bind(this));
		this.$mainColoursInput.addEventListener("input", this.loadMainColourSelectTags.bind(this));
		this.$highlightColoursInput.addEventListener("input", this.loadHighlightColourSelectTags.bind(this));
		
		// Submit the new item data
		this.$submitButton.addEventListener("click", this.submitData.bind(this));

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
		this.$editItem.classList.add("edit-item--active");
		this.$header.classList.add("header--hidden");
	}

	hide() {
		this.$editItem.classList.remove("edit-item--active");
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
		const $tagDisplay = this.$tagDisplayTemplate.content.cloneNode(true).firstElementChild;
		const $tagName = $tagDisplay.querySelector(".tag-display__name");
		const $tagRemove = $tagDisplay.querySelector(".tag-display__remove");
		
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
		this.$materialsSelectList.classList.remove("edit-item__tag-select--active");
		this.$mainColoursSelectList.classList.remove("edit-item__tag-select--active");
		this.$highlightColoursSelectList.classList.remove("edit-item__tag-select--active");
	}

	selectImagePreview(event) {
		const $selectedImageFile = document.querySelector(".edit-item__image-file--active");
		$selectedImageFile.classList.remove("edit-item__image-file--active");
		this.classList.add("edit-item__image-file--active");
	}

	// Material Tags
	loadMaterialSelectTags() {
		// Remove all tags from the list
		while (this.$materialsSelectList.firstChild) {
			this.$materialsSelectList.removeChild(this.$materialsSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$materialsInput.value;
		const filteredTags = this.tagLists.materials.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.addMaterialTag.bind(this));
			this.$materialsSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addMaterialTag.bind(this));
		this.$materialsSelectList.appendChild($addNewTag);
	}

	showMaterialSelectList(event) {
		event.stopPropagation();
		this.$mainColoursSelectList.classList.remove("edit-item__tag-select--active");
		this.$highlightColoursSelectList.classList.remove("edit-item__tag-select--active");
		this.$materialsSelectList.classList.add("edit-item__tag-select--active");
	}

	addMaterialTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$materialsInput.value : tagName;
		this.$materialsInput.focus();
		if (!tag) return;

		this.tagLists.materials.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeMaterialTag.bind(this));
		this.$materialsDisplayList.appendChild($tagDisplay);
		
		this.$materialsInput.value = "";
		this.loadMaterialSelectTags();
	}

	removeMaterialTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tag = $tagName.innerText;
		this.tagLists.materials.removeTag(tag);

		this.$materialsDisplayList.removeChild(event.target.parentElement);
		this.loadMaterialSelectTags();
	}

	// Main Colour Tags
	loadMainColourSelectTags() {
		// Remove all tags from the list
		while (this.$mainColoursSelectList.firstChild != null) {
			this.$mainColoursSelectList.removeChild(this.$mainColoursSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$mainColoursInput.value;
		const filteredTags = this.tagLists.mainColours.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.addMainColourTag.bind(this));
			this.$mainColoursSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addMainColourTag.bind(this));
		this.$mainColoursSelectList.appendChild($addNewTag);
	}

	showMainColourSelectList(event) {
		event.stopPropagation();
		this.$materialsSelectList.classList.remove("edit-item__tag-select--active");
		this.$highlightColoursSelectList.classList.remove("edit-item__tag-select--active");
		this.$mainColoursSelectList.classList.add("edit-item__tag-select--active");
	}

	addMainColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$mainColoursInput.value : tagName;
		this.$mainColoursInput.focus();
		if (!tag) return;

		this.tagLists.mainColours.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeMainColourTag.bind(this));
		this.$mainColoursDisplayList.appendChild($tagDisplay);

		this.$mainColoursInput.value = "";
		this.loadMainColourSelectTags();
	}

	removeMainColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tag = $tagName.innerText;
		this.tagLists.mainColours.removeTag(tag);

		this.$mainColoursDisplayList.removeChild(event.target.parentElement);
		this.loadMainColourSelectTags();
	}

	// Highlight Colour Tags
	loadHighlightColourSelectTags() {
		// Remove all tags from the list
		while (this.$highlightColoursSelectList.firstChild != null) {
			this.$highlightColoursSelectList.removeChild(this.$highlightColoursSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$highlightColoursInput.value;
		const filteredTags = this.tagLists.highlightColours.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.addHighlightColourTag.bind(this));
			this.$highlightColoursSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addHighlightColourTag.bind(this));
		this.$highlightColoursSelectList.appendChild($addNewTag);
	}

	showHighlightColourSelectList(event) {
		event.stopPropagation();
		this.$materialsSelectList.classList.remove("edit-item__tag-select--active");
		this.$mainColoursSelectList.classList.remove("edit-item__tag-select--active");
		this.$highlightColoursSelectList.classList.add("edit-item__tag-select--active");
	}

	addHighlightColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$highlightColoursInput.value : tagName;
		this.$highlightColoursInput.focus();
		if (!tag) return;

		this.tagLists.highlightColours.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeHighlightColourTag.bind(this));
		this.$highlightColoursDisplayList.appendChild($tagDisplay);

		this.$highlightColoursInput.value = "";
		this.loadHighlightColourSelectTags();
	}

	removeHighlightColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tag = $tagName.innerText;
		this.tagLists.highlightColours.removeTag(tag);

		this.$highlightColoursDisplayList.removeChild(event.target.parentElement);
		this.loadHighlightColourSelectTags();
	}

	// Submit New Item
	submitData(event) {
		console.log(this.getData());
	}
}
