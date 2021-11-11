import StockItem from "./stock-item.js";
import * as http from "../http.js";

export default class EditItem extends StockItem {
	constructor(materialTags, colourTags, generalTags, itemData) {
		super(materialTags, colourTags, generalTags, itemData);

		// Get references to DOM
		this.$tagDisplayTemplate = document.getElementById("tag-display-template");
		
		this.$header = document.querySelector(".header");
		this.$editItem = document.querySelector(".edit-item");

		this.$imagePreview = document.querySelector(".edit-item__image-preview");
		this.$imageLabels = document.querySelectorAll(".edit-item__image-label");
		this.$imageInputs = document.querySelectorAll(".edit-item__image-upload");

		this.$nameInput = document.getElementById("edit-item-name");
		this.$quantityInput = document.getElementById("edit-item-quantity");

		this.$materialSelectList = document.getElementById("edit-material-select");
		this.$materialInput = document.getElementById("edit-material-input");
		this.$materialDisplayList = document.getElementById("edit-material-display");
		
		this.$colourSelectList = document.getElementById("edit-colour-select");
		this.$colourInput = document.getElementById("edit-colour-input");
		this.$colourDisplayList = document.getElementById("edit-colour-display");
		
		this.$generalSelectList = document.getElementById("edit-general-select");
		this.$generalInput = document.getElementById("edit-general-input");
		this.$generalDisplayList = document.getElementById("edit-general-display");

		this.$cancelButton = document.querySelector(".edit-item__cancel");
		this.$deleteButton = document.querySelector(".edit-item__delete");
		this.$submitButton = document.querySelector(".edit-item__submit");

		// Set up UI
		this.loadMaterialSelectTags(materialTags);
		this.loadColourSelectTags(colourTags);
		this.loadGeneralSelectTags(generalTags);

		// Image Preview Selector
		for (let i = 0; i < this.$imageLabels.length; i++) {
			this.$imageLabels[i].addEventListener("click", (event) => this.selectImagePreview(i));
		}

		// Image Input on change
		for (let i = 0; i < this.$imageInputs.length; i++) {
			this.$imageInputs[i].addEventListener("change", (event) => {
				const filePath = URL.createObjectURL(this.$imageInputs[i].files[0]);
				this.$imageLabels[i].dataset.filePath = filePath;
				this.selectImagePreview(i);
			});
		}
		
		// Update data as user inputs
		this.$nameInput.addEventListener("input", (event) => this.setName(this.$nameInput.value));
		this.$quantityInput.addEventListener("input", (event) => this.setQuantity(this.$quantityInput.value));

		// Show tag filter boxes when corresponding input box is clicked, hide others
		this.$materialInput.addEventListener("click", this.showMaterialSelectList.bind(this));
		this.$colourInput.addEventListener("click", this.showColourSelectList.bind(this));
		this.$generalInput.addEventListener("click", this.showGeneralSelectList.bind(this));

		// Refresh the select tags list when one is selected
		this.$materialInput.addEventListener("input", this.loadMaterialSelectTags.bind(this));
		this.$colourInput.addEventListener("input", this.loadColourSelectTags.bind(this));
		this.$generalInput.addEventListener("input", this.loadGeneralSelectTags.bind(this));
		
		// Close all filter boxes when clicking outside of the box
		this.$editItem.addEventListener("click", (event) => {
			event.stopPropagation()
			this.hideAllTagSelectLists();
		});

		// Close the pop-up when the cancel button is clicked
		this.$cancelButton.addEventListener("click", (event) => this.hide());

		// Delete item from database
		this.$deleteButton.addEventListener("click", (event) => this.deleteItem());

		// Submit the updated item data
		this.$submitButton.addEventListener("click", (event) => this.submitData());
	}

	clearForm() {
		this.$imagePreview.src = "img/aa-logo-stamp.png";
		this.$imageInputs.forEach($imageInput => $imageInput.value = null);
		for (let i = 0; i < 3; i++) {
			this.$imageLabels[i].dataset.filePath = "img/aa-logo-stamp.png";
		}
		this.selectImagePreview(0);
		
		this.$nameInput.value = "";
		this.$quantityInput.value = 0;

		while (this.$materialDisplayList.firstChild) {
			this.$materialDisplayList.removeChild(this.$materialDisplayList.lastChild);
		}

		while (this.$colourDisplayList.firstChild) {
			this.$colourDisplayList.removeChild(this.$colourDisplayList.lastChild);
		}
		
		while (this.$generalDisplayList.firstChild) {
			this.$generalDisplayList.removeChild(this.$generalDisplayList.lastChild);
		}
	}

	show(itemData) {
		// this.$editItem.scrollTo(0, 0);
		this.clearForm();
		this.$editItem.classList.add("edit-item--active");
		
		// Set file inputs for images
		for (let i = 0; i < 3; i++) {
			const filePath = (itemData.images[i]) ? `images/${itemData.images[i]}` : "img/aa-logo-stamp.png";
			this.$imageLabels[i].dataset.filePath = filePath;
		}

		// Set image preview to the first image
		this.$imagePreview.src = this.$imageLabels[0].dataset.filePath;

		// Set name and quantity
		this.$nameInput.value = itemData.name;
		this.$quantityInput.value = itemData.quantity;
		
		// Set tags
		itemData.tagLists.material.forEach(tag => this.addMaterialTag(tag));
		itemData.tagLists.colour.forEach(tag => this.addColourTag(tag));
		itemData.tagLists.general.forEach(tag => this.addGeneralTag(tag));
	}

	hide() {
		this.$editItem.classList.remove("edit-item--active");
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
		this.$materialSelectList.classList.remove("edit-item__tag-select--active");
		this.$colourSelectList.classList.remove("edit-item__tag-select--active");
		this.$generalSelectList.classList.remove("edit-item__tag-select--active");
	}

	selectImagePreview(index) {
		const $selectedImageLabel = document.querySelector(".edit-item__image-label--active");
		$selectedImageLabel.classList.remove("edit-item__image-label--active");
		this.$imageLabels[index].classList.add("edit-item__image-label--active");
		
		const filePath = (this.$imageLabels[index].dataset.filePath) ? this.$imageLabels[index].dataset.filePath : "img/aa-logo-stamp.png";
		this.$imagePreview.src = filePath;
	}

	// Material Tags
	loadMaterialSelectTags() {
		// Remove all tags from the list
		while (this.$materialSelectList.firstChild) {
			this.$materialSelectList.removeChild(this.$materialSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$materialInput.value;
		const filteredTags = this.tagLists.material.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.onClickAddMaterialTag.bind(this));
			this.$materialSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.onClickAddMaterialTag.bind(this));
		this.$materialSelectList.appendChild($addNewTag);
	}

	showMaterialSelectList(event) {
		event.stopPropagation();
		this.$colourSelectList.classList.remove("edit-item__tag-select--active");
		this.$generalSelectList.classList.remove("edit-item__tag-select--active");
		this.$materialSelectList.classList.add("edit-item__tag-select--active");
	}

	onClickAddMaterialTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$materialInput.value : tagName;
		this.addMaterialTag(tag);
	}

	addMaterialTag(tag) {
		this.$materialInput.focus();
		if (!tag) return;

		this.tagLists.material.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeMaterialTag.bind(this));
		this.$materialDisplayList.appendChild($tagDisplay);
		
		this.$materialInput.value = "";
		this.loadMaterialSelectTags();
	}

	removeMaterialTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tag = $tagName.innerText;
		this.tagLists.material.removeTag(tag);

		this.$materialDisplayList.removeChild(event.target.parentElement);
		this.loadMaterialSelectTags();
	}

	// Colour Tags
	loadColourSelectTags() {
		// Remove all tags from the list
		while (this.$colourSelectList.firstChild != null) {
			this.$colourSelectList.removeChild(this.$colourSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$colourInput.value;
		const filteredTags = this.tagLists.colour.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.onClickAddColourTag.bind(this));
			this.$colourSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.onClickAddColourTag.bind(this));
		this.$colourSelectList.appendChild($addNewTag);
	}

	showColourSelectList(event) {
		event.stopPropagation();
		this.$materialSelectList.classList.remove("edit-item__tag-select--active");
		this.$generalSelectList.classList.remove("edit-item__tag-select--active");
		this.$colourSelectList.classList.add("edit-item__tag-select--active");
	}

	onClickAddColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$colourInput.value : tagName;
		this.addColourTag(tag);
	}

	addColourTag(tag) {
		this.$colourInput.focus();
		if (!tag) return;

		this.tagLists.colour.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeColourTag.bind(this));
		this.$colourDisplayList.appendChild($tagDisplay);

		this.$colourInput.value = "";
		this.loadColourSelectTags();
	}

	removeColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tag = $tagName.innerText;
		this.tagLists.colour.removeTag(tag);

		this.$colourDisplayList.removeChild(event.target.parentElement);
		this.loadColourSelectTags();
	}

	// General Tags
	loadGeneralSelectTags() {
		// Remove all tags from the list
		while (this.$generalSelectList.firstChild != null) {
			this.$generalSelectList.removeChild(this.$generalSelectList.lastChild);
		}

		// Get tags by filtering and sorting available tags with input box string
		const filterString = this.$generalInput.value;
		const filteredTags = this.tagLists.general.getFilteredTags(filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < filteredTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(filteredTags[i], this.onClickAddGeneralTag.bind(this));
			this.$generalSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.onClickAddGeneralTag.bind(this));
		this.$generalSelectList.appendChild($addNewTag);
	}

	showGeneralSelectList(event) {
		event.stopPropagation();
		this.$materialSelectList.classList.remove("edit-item__tag-select--active");
		this.$colourSelectList.classList.remove("edit-item__tag-select--active");
		this.$generalSelectList.classList.add("edit-item__tag-select--active");
	}

	onClickAddGeneralTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$generalInput.value : tagName;
		this.addGeneralTag(tag);
	}

	addGeneralTag(tag) {
		this.$generalInput.focus();
		if (!tag) return;

		this.tagLists.general.addTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeGeneralTag.bind(this));
		this.$generalDisplayList.appendChild($tagDisplay);

		this.$generalInput.value = "";
		this.loadGeneralSelectTags();
	}

	removeGeneralTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tag = $tagName.innerText;
		this.tagLists.general.removeTag(tag);

		this.$generalDisplayList.removeChild(event.target.parentElement);
		this.loadGeneralSelectTags();
	}

	// Delete Item from Database
	async deleteItem() {
		const check = confirm("Are you sure you want to delete this item?");
		if (!check) return;

		const data = this.getData();
		console.log("Delete Item");
		console.log(data);
		const response = await http.deleteStockItem(data.id);
		console.log(response);
	}

	// Submit Updated Item
	async submitData() {
		const data = this.getData();
		console.log("Edit Item");
		console.log(data);
		const response = await http.updateStockItem(data.id, data);
		console.log(response);
	}
}
