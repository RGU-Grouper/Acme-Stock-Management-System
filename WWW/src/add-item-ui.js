import AddItem from "./add-item-data.js";

export default class AddItemUI extends AddItem {
	constructor(materialTags, colourTags) {
		super();

		this.materialTags = materialTags;
		this.colourTags = colourTags;

		// Get references to DOM
		this.$tagTemplate = document.getElementById("tag-template");
		
		this.$nameInput = document.querySelector(".add-item__name-input");
		this.$quantityInput = document.querySelector(".add-item__quantity-input");

		this.$materialSelectList = document.querySelector(".add-item__material-select");
		this.$materialInput = document.querySelector(".add-item__material-input");
		this.$materialDisplayList = document.querySelector(".add-item__material-display");
		
		this.$mainColourSelectList = document.querySelector(".add-item__main-colour-select");
		this.$mainColourInput = document.querySelector(".add-item__main-colour-input");
		this.$mainColourDisplayList = document.querySelector(".add-item__main-colour-display");
		
		this.$highlightColourSelectList = document.querySelector(".add-item__highlight-colour-select");
		this.$highlightColourInput = document.querySelector(".add-item__highlight-colour-input");
		this.$highlightColourDisplayList = document.querySelector(".add-item__highlight-colour-display");

		this.$submitButton = document.querySelector(".add-item__submit");

		// Set up UI
		this.loadMaterialSelectTags(this.materialTags);
		this.loadMainColourSelectTags(this.colourTags);
		this.loadHighlightColourSelectTags(this.colourTags);

		// Set event handlers
		document.addEventListener("click", (event) => {
			this.$materialSelectList.classList.remove("add-item__material-select--active");
			this.$mainColourSelectList.classList.remove("add-item__main-colour-select--active");
			this.$highlightColourSelectList.classList.remove("add-item__highlight-colour-select--active");
		});

		this.$nameInput.addEventListener("input", (event) => this.setName(this.$nameInput.value));
		this.$quantityInput.addEventListener("input", (event) => this.setQuantity(+this.$quantityInput.value));

		this.$materialInput.addEventListener("click", (event) => {
			event.stopPropagation();
			this.$mainColourSelectList.classList.remove("add-item__main-colour-select--active");
			this.$highlightColourSelectList.classList.remove("add-item__highlight-colour-select--active");
			this.$materialSelectList.classList.add("add-item__material-select--active");
		});
		this.$materialInput.addEventListener("input", this.loadMaterialSelectTags.bind(this));
		
		this.$mainColourInput.addEventListener("click", (event) => {
			event.stopPropagation();
			this.$materialSelectList.classList.remove("add-item__material-select--active");
			this.$highlightColourSelectList.classList.remove("add-item__highlight-colour-select--active");
			this.$mainColourSelectList.classList.add("add-item__main-colour-select--active");
		});
		this.$mainColourInput.addEventListener("input", this.loadMainColourSelectTags.bind(this));
		
		this.$highlightColourInput.addEventListener("click", (event) => {
			event.stopPropagation();
			this.$materialSelectList.classList.remove("add-item__material-select--active");
			this.$mainColourSelectList.classList.remove("add-item__main-colour-select--active");
			this.$highlightColourSelectList.classList.add("add-item__highlight-colour-select--active");
		});
		this.$highlightColourInput.addEventListener("input", this.loadHighlightColourSelectTags.bind(this));

		this.$submitButton.addEventListener("click", this.submitData.bind(this));
	}

	sortStringArrayFromInput(array, inputString) {
		// Make a new array by checking if the start of each string matches the the input, add the string to the new array if it does, else add null.
		// Filter the new array to remove any null values, leaving only the strings which start with the input.
		const startArray = array.map(string => string.substring(0, inputString.length).toLowerCase() === inputString.toLowerCase() ? string : null).filter(string => string != null);
		const endArray = array.filter(string => !startArray.includes(string));
		return startArray.concat(endArray);
	}

	createTagSelectItem(tag, onClickCallback) {
		const $tagSelect = document.createElement("li");
		$tagSelect.classList.add("tag-select");
		$tagSelect.innerText = tag;
		$tagSelect.addEventListener("click", onClickCallback);
		return $tagSelect;
	}

	createTagDisplayItem(tag, onClickCallback) {
		const $tagDisplay = this.$tagTemplate.content.cloneNode(true).firstElementChild;
		const $tagName = $tagDisplay.querySelector(".tag__name");
		const $tagRemove = $tagDisplay.querySelector(".tag__remove");
		
		$tagName.innerText = tag;
		$tagRemove.addEventListener("click", onClickCallback);
		
		return $tagDisplay;
	}

	// Material Tags
	addMaterialTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$materialInput.value : tagName;
		if (!tag) return;

		super.addMaterialTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeMaterialTag.bind(this));
		this.$materialDisplayList.appendChild($tagDisplay);
		
		this.$materialInput.value = "";
		this.$materialInput.focus();

		this.loadMaterialSelectTags();
	}

	removeMaterialTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag__name");
		const tag = $tagName.innerText;
		super.removeMaterialTag(tag);

		this.$materialDisplayList.removeChild(event.target.parentElement);
		this.loadMaterialSelectTags();
	}

	loadMaterialSelectTags() {
		// Remove all tags from the list
		while (this.$materialSelectList.firstChild) {
			this.$materialSelectList.removeChild(this.$materialSelectList.lastChild);
		}

		// Get input box filter string
		const filterString = this.$materialInput.value;

		// Check for tags that have already been applied and remove from list of available tags
		const appliedTags = this.getMaterialTags();
		const availableTags = this.materialTags.filter(t => !appliedTags.includes(t));

		// Use input value to filter available tags
		const filteredTags = availableTags.filter(t => t.match(new RegExp(filterString, "i")));
		
		// Sort tags starting with input value first
		const sortedTags = this.sortStringArrayFromInput(filteredTags, filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < sortedTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(sortedTags[i], this.addMaterialTag.bind(this));
			this.$materialSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addMaterialTag.bind(this));
		this.$materialSelectList.appendChild($addNewTag);
	}

	// Main Colour Tags
	addMainColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$mainColourInput.value : tagName;
		if (!tag) return;

		super.addMainColourTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeMainColourTag.bind(this));
		this.$mainColourDisplayList.appendChild($tagDisplay);

		this.$mainColourInput.value = "";
		this.$mainColourInput.focus();

		this.loadMainColourSelectTags();
	}

	removeMainColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag__name");
		const tag = $tagName.innerText;
		super.removeMainColourTag(tag);

		this.$mainColourDisplayList.removeChild(event.target.parentElement);
		this.loadMainColourSelectTags();
	}

	loadMainColourSelectTags() {
		// Remove all tags from the list
		while (this.$mainColourSelectList.firstChild != null) {
			this.$mainColourSelectList.removeChild(this.$mainColourSelectList.lastChild);
		}

		// Get input box filter string
		const filterString = this.$mainColourInput.value;

		// Check for tags that have already been applied and remove from list
		const appliedTags = this.getMainColourTags();
		const availableTags = this.colourTags.filter(t => !appliedTags.includes(t));

		// Use input value to filter available tags
		const filteredTags = availableTags.filter(t => t.match(new RegExp(filterString, "i")));
		
		// Sort tags starting with input value first
		const sortedTags = this.sortStringArrayFromInput(filteredTags, filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < sortedTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(sortedTags[i], this.addMainColourTag.bind(this));
			this.$mainColourSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addMainColourTag.bind(this));
		this.$mainColourSelectList.appendChild($addNewTag);
	}

	// Highlight Colour Tags
	addHighlightColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$highlightColourInput.value : tagName;
		if (!tag) return;

		super.addHighlightColourTag(tag);

		const $tagDisplay = this.createTagDisplayItem(tag, this.removeHighlightColourTag.bind(this));
		this.$highlightColourDisplayList.appendChild($tagDisplay);

		this.$highlightColourInput.value = "";
		this.$highlightColourInput.focus();

		this.loadHighlightColourSelectTags();
	}

	removeHighlightColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag__name");
		const tag = $tagName.innerText;
		super.removeHighlightColourTag(tag);

		this.$highlightColourDisplayList.removeChild(event.target.parentElement);
		this.loadHighlightColourSelectTags();
	}

	loadHighlightColourSelectTags() {
		// Remove all tags from the list
		while (this.$highlightColourSelectList.firstChild != null) {
			this.$highlightColourSelectList.removeChild(this.$highlightColourSelectList.lastChild);
		}
		// Get input box filter string
		const filterString = this.$highlightColourInput.value;

		// Check for tags that have already been applied and remove from list
		const appliedTags = this.getHighlightColourTags();
		const availableTags = this.colourTags.filter(t => !appliedTags.includes(t));

		// Use input value to filter available tags
		const filteredTags = availableTags.filter(t => t.match(new RegExp(filterString, "i")));
		
		// Sort tags starting with input value first
		const sortedTags = this.sortStringArrayFromInput(filteredTags, filterString);

		// Create tag select items and add to the list
		for (let i = 0; i < sortedTags.length; i++) {
			const $tagSelect = this.createTagSelectItem(sortedTags[i], this.addHighlightColourTag.bind(this));
			this.$highlightColourSelectList.appendChild($tagSelect);
		}

		// Create add new tag select item and add to the list
		const $addNewTag = this.createTagSelectItem("Add New...", this.addHighlightColourTag.bind(this));
		this.$highlightColourSelectList.appendChild($addNewTag);
	}

	// Submit New Item
	submitData(event) {
		console.log(this.getData());
	}
}
