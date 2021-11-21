import StockItem from "./stock-item.js";
import * as http from "../http.js";

export default class AddItem extends StockItem {
<<<<<<< HEAD
    constructor(materialTags, colourTags, itemData) {
        super(materialTags, colourTags, itemData);

        this.materialTags = materialTags;
        this.colourTags = colourTags;

        // Get references to DOM
        this.$tagDisplayTemplate = document.getElementById("tag-display-template");

        this.$header = document.querySelector(".header");
        this.$editItem = document.querySelector(".add-item");

        this.$imagePreview = document.querySelector(".add-item__image-preview");
        this.$imageLabels = document.querySelectorAll(".add-item__image-label");
        this.$imageInputs = document.querySelectorAll(".add-item__image-upload");

        this.$nameInput = document.getElementById("add-item-name");
        this.$quantityInput = document.getElementById("add-item-quantity");

        this.$materialsSelectList = document.getElementById("add-materials-select");
        this.$materialsInput = document.getElementById("add-materials-input");
        this.$materialsDisplayList = document.getElementById("add-materials-display");

        this.$mainColoursSelectList = document.getElementById("add-main-colours-select");
        this.$mainColoursInput = document.getElementById("add-main-colours-input");
        this.$mainColoursDisplayList = document.getElementById("add-main-colours-display");

        this.$highlightColoursSelectList = document.getElementById("add-highlight-colours-select");
        this.$highlightColoursInput = document.getElementById("add-highlight-colours-input");
        this.$highlightColoursDisplayList = document.getElementById("add-highlight-colours-display");

        this.$cancelButton = document.querySelector(".add-item__cancel");
        this.$submitButton = document.querySelector(".add-item__submit");

        // Set up UI
        this.loadMaterialSelectTags(materialTags);
        this.loadMainColourSelectTags(colourTags);
        this.loadHighlightColourSelectTags(colourTags);

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
        this.$materialsInput.addEventListener("click", this.showMaterialSelectList.bind(this));
        this.$mainColoursInput.addEventListener("click", this.showMainColourSelectList.bind(this));
        this.$highlightColoursInput.addEventListener("click", this.showHighlightColourSelectList.bind(this));

        // Refresh the select tags list when one is selected
        this.$materialsInput.addEventListener("input", this.loadMaterialSelectTags.bind(this));
        this.$mainColoursInput.addEventListener("input", this.loadMainColourSelectTags.bind(this));
        this.$highlightColoursInput.addEventListener("input", this.loadHighlightColourSelectTags.bind(this));

        // Close all filter boxes when clicking outside of the box
        this.$editItem.addEventListener("click", (event) => {
            event.stopPropagation()
            this.hideAllTagSelectLists();
        });

        // Close the pop-up when the cancel button is clicked
        this.$cancelButton.addEventListener("click", (event) => {
            this.$header.classList.remove("header--hidden");
            this.hide();
        });

        // Submit the new item data
        this.$submitButton.addEventListener("click", (event) => this.submitData());
    }

    clearForm() {
        this.$imagePreview.src = "img/aa-logo-stamp.png";
        this.$imageInputs.forEach($imageInput => $imageInput.value = null);
        this.selectImagePreview(0);

        this.$nameInput.value = "";
        this.$quantityInput.value = 0;

        while (this.$materialsDisplayList.firstChild) {
            this.$materialsDisplayList.removeChild(this.$materialsDisplayList.lastChild);
        }

        while (this.$mainColoursDisplayList.firstChild) {
            this.$mainColoursDisplayList.removeChild(this.$mainColoursDisplayList.lastChild);
        }

        while (this.$highlightColoursDisplayList.firstChild) {
            this.$highlightColoursDisplayList.removeChild(this.$highlightColoursDisplayList.lastChild);
        }
    }

    show() {
        this.$editItem.scrollTo(0, 0);
        this.clearForm();
        this.$header.classList.add("header--hidden");
        this.$editItem.classList.add("add-item--active");

        const itemData = this.getData();

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
        itemData.tagLists.materials.forEach(tag => this.addMaterialTag(tag));
        itemData.tagLists.mainColours.forEach(tag => this.addMainColourTag(tag));
        itemData.tagLists.highlightColours.forEach(tag => this.addHighlightColourTag(tag));
    }

    hide() {
        this.$editItem.classList.remove("add-item--active");
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
        this.$materialsSelectList.classList.remove("add-item__tag-select--active");
        this.$mainColoursSelectList.classList.remove("add-item__tag-select--active");
        this.$highlightColoursSelectList.classList.remove("add-item__tag-select--active");
    }

    selectImagePreview(index) {
        const $selectedImageLabel = document.querySelector(".add-item__image-label--active");
        $selectedImageLabel.classList.remove("add-item__image-label--active");
        this.$imageLabels[index].classList.add("add-item__image-label--active");

        const filePath = this.$imageLabels[index].dataset.filePath || "img/aa-logo-stamp.png";
        this.$imagePreview.src = filePath;
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
            const $tagSelect = this.createTagSelectItem(filteredTags[i], this.onClickAddMaterialTag.bind(this));
            this.$materialsSelectList.appendChild($tagSelect);
        }

        // Create add new tag select item and add to the list
        const $addNewTag = this.createTagSelectItem("Add New...", this.onClickAddMaterialTag.bind(this));
        this.$materialsSelectList.appendChild($addNewTag);
    }

    showMaterialSelectList(event) {
        event.stopPropagation();
        this.$mainColoursSelectList.classList.remove("add-item__tag-select--active");
        this.$highlightColoursSelectList.classList.remove("add-item__tag-select--active");
        this.$materialsSelectList.classList.add("add-item__tag-select--active");
    }

    onClickAddMaterialTag(event) {
        event.stopPropagation();
        const tagName = event.target.innerText;
        const tag = (tagName === "Add New...") ? this.$materialsInput.value : tagName;
        this.addMaterialTag(tag);
    }

    addMaterialTag(tag) {
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
            const $tagSelect = this.createTagSelectItem(filteredTags[i], this.onClickAddMainColourTag.bind(this));
            this.$mainColoursSelectList.appendChild($tagSelect);
        }

        // Create add new tag select item and add to the list
        const $addNewTag = this.createTagSelectItem("Add New...", this.onClickAddMainColourTag.bind(this));
        this.$mainColoursSelectList.appendChild($addNewTag);
    }

    showMainColourSelectList(event) {
        event.stopPropagation();
        this.$materialsSelectList.classList.remove("add-item__tag-select--active");
        this.$highlightColoursSelectList.classList.remove("add-item__tag-select--active");
        this.$mainColoursSelectList.classList.add("add-item__tag-select--active");
    }

    onClickAddMainColourTag(event) {
        event.stopPropagation();
        const tagName = event.target.innerText;
        const tag = (tagName === "Add New...") ? this.$mainColoursInput.value : tagName;
        this.addMainColourTag(tag);
    }

    addMainColourTag(tag) {
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
            const $tagSelect = this.createTagSelectItem(filteredTags[i], this.onClickAddHighlightColourTag.bind(this));
            this.$highlightColoursSelectList.appendChild($tagSelect);
        }

        // Create add new tag select item and add to the list
        const $addNewTag = this.createTagSelectItem("Add New...", this.onClickAddHighlightColourTag.bind(this));
        this.$highlightColoursSelectList.appendChild($addNewTag);
    }

    showHighlightColourSelectList(event) {
        event.stopPropagation();
        this.$materialsSelectList.classList.remove("add-item__tag-select--active");
        this.$mainColoursSelectList.classList.remove("add-item__tag-select--active");
        this.$highlightColoursSelectList.classList.add("add-item__tag-select--active");
    }

    onClickAddHighlightColourTag(event) {
        event.stopPropagation();
        const tagName = event.target.innerText;
        const tag = (tagName === "Add New...") ? this.$highlightColoursInput.value : tagName;
        this.addHighlightColourTag(tag);
    }

    addHighlightColourTag(tag) {
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
    async submitData(event) {
        const data = this.getData();
        console.log("Add Item");
        console.log(data);
        const response = await http.addStockItem(data);
        console.log(response);
    }
}
=======
	constructor(materialTags, colourTags, generalTags, itemData) {
		super(materialTags, colourTags, generalTags, itemData);

		// Get references to DOM
		this.$tagDisplayTemplate = document.getElementById("tag-display-template");
		
		this.$header = document.querySelector(".header");
		this.$editItem = document.querySelector(".add-item");

		this.$imagePreview = document.querySelector(".add-item__image-preview");
		this.$imageLabels = document.querySelectorAll(".add-item__image-label");
		this.$imageInputs = document.querySelectorAll(".add-item__image-upload");

		this.$nameInput = document.getElementById("add-item-name");
		this.$quantityInput = document.getElementById("add-item-quantity");

		this.$materialSelectList = document.getElementById("add-material-select");
		this.$materialInput = document.getElementById("add-material-input");
		this.$materialDisplayList = document.getElementById("add-material-display");
		
		this.$colourSelectList = document.getElementById("add-colour-select");
		this.$colourInput = document.getElementById("add-colour-input");
		this.$colourDisplayList = document.getElementById("add-colour-display");
		
		this.$generalSelectList = document.getElementById("add-general-select");
		this.$generalInput = document.getElementById("add-general-input");
		this.$generalDisplayList = document.getElementById("add-general-display");

		this.$cancelButton = document.querySelector(".add-item__cancel");
		this.$submitButton = document.querySelector(".add-item__submit");

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
		this.$cancelButton.addEventListener("click", (event) => {
			this.$header.classList.remove("header--hidden");
			this.hide();
		});

		// Submit the new item data
		this.$submitButton.addEventListener("click", (event) => this.submitData());
	}

	resetItemData() {
		this.setData({
			name: "",
			quantity: 0,
			image1: "",
			image2: "",
		});
		this.tagLists.material.clearTags();
		this.tagLists.colour.clearTags();
		this.tagLists.general.clearTags();
	}

	clearForm() {
		this.$imagePreview.src = "img/placeholder.png";
		this.$imageInputs.forEach($imageInput => $imageInput.value = null);
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

	show() {
		this.resetItemData();
		this.clearForm();
		this.$header.classList.add("header--hidden");
		this.$editItem.classList.add("add-item--active");

		const itemData = this.getData();

		// Set file inputs for images
		const filePath1 = (itemData.image1) ? `images/${itemData.image1}` : "img/placeholder.png";
		this.$imageLabels[0].dataset.filePath = filePath1;
		
		const filePath2 = (itemData.image2) ? `images/${itemData.image2}` : "img/placeholder.png";
		this.$imageLabels[1].dataset.filePath = filePath2;

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
		this.$editItem.classList.remove("add-item--active");
	}

	createTagSelectItem(tag, addTagCallback) {
		const $tagSelect = document.createElement("li");
		$tagSelect.classList.add("tag-select");
		$tagSelect.innerText = tag.name;
		$tagSelect.addEventListener("click", addTagCallback);
		return $tagSelect;
	}

	createTagDisplayItem(tagName, removeTagCallback) {
		const $tagDisplay = this.$tagDisplayTemplate.content.cloneNode(true).firstElementChild;
		const $tagName = $tagDisplay.querySelector(".tag-display__name");
		const $tagRemove = $tagDisplay.querySelector(".tag-display__remove");
		
		$tagName.innerText = tagName;
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
		this.$materialSelectList.classList.remove("add-item__tag-select--active");
		this.$colourSelectList.classList.remove("add-item__tag-select--active");
		this.$generalSelectList.classList.remove("add-item__tag-select--active");
	}

	selectImagePreview(index) {
		const $selectedImageLabel = document.querySelector(".add-item__image-label--active");
		$selectedImageLabel.classList.remove("add-item__image-label--active");
		this.$imageLabels[index].classList.add("add-item__image-label--active");
		
		const filePath = this.$imageLabels[index].dataset.filePath || "image/placeholder.png";
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
		const $addNewTag = this.createTagSelectItem({ name: "Add New..." }, this.onClickAddMaterialTag.bind(this));
		this.$materialSelectList.appendChild($addNewTag);
	}

	showMaterialSelectList(event) {
		event.stopPropagation();
		this.$colourSelectList.classList.remove("add-item__tag-select--active");
		this.$generalSelectList.classList.remove("add-item__tag-select--active");
		this.$materialSelectList.classList.add("add-item__tag-select--active");
	}

	onClickAddMaterialTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$materialInput.value : tagName;
		this.addMaterialTag(tag);
	}

	addMaterialTag(tagName) {
		this.$materialInput.focus();
		if (!tagName) return;

		const tag = this.tagLists.material.getTagByName(tagName);
		if (tag) {
			this.tagLists.material.addTag(tag);
		}
		else {
			this.tagLists.material.addTag({ name: tagName, category: "material" });
		}
		const $tagDisplay = this.createTagDisplayItem(tagName, this.removeMaterialTag.bind(this));
		this.$materialDisplayList.appendChild($tagDisplay);
		
		this.$materialInput.value = "";
		this.loadMaterialSelectTags();
	}

	removeMaterialTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tagName = $tagName.innerText;
		const tag = this.tagLists.material.getTags().find(tag => tag.name === tagName);
		if (tag) this.tagLists.material.removeTag(tag);

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
		const $addNewTag = this.createTagSelectItem({ name: "Add New..." }, this.onClickAddColourTag.bind(this));
		this.$colourSelectList.appendChild($addNewTag);
	}

	showColourSelectList(event) {
		event.stopPropagation();
		this.$materialSelectList.classList.remove("add-item__tag-select--active");
		this.$generalSelectList.classList.remove("add-item__tag-select--active");
		this.$colourSelectList.classList.add("add-item__tag-select--active");
	}

	onClickAddColourTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$colourInput.value : tagName;
		this.addColourTag(tag);
	}

	addColourTag(tagName) {
		this.$colourInput.focus();
		if (!tagName) return;

		const tag = this.tagLists.colour.getTagByName(tagName);
		if (tag) {
			this.tagLists.colour.addTag(tag);
		}
		else {
			this.tagLists.colour.addTag({ name: tagName, category: "colour" });
		}

		const $tagDisplay = this.createTagDisplayItem(tagName, this.removeColourTag.bind(this));
		this.$colourDisplayList.appendChild($tagDisplay);

		this.$colourInput.value = "";
		this.loadColourSelectTags();
	}

	removeColourTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tagName = $tagName.innerText;
		const tag = this.tagLists.colour.getTags().find(tag => tag.name === tagName);
		if (tag) this.tagLists.colour.removeTag(tag);

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
		const $addNewTag = this.createTagSelectItem({ name: "Add New..." }, this.onClickAddGeneralTag.bind(this));
		this.$generalSelectList.appendChild($addNewTag);
	}

	showGeneralSelectList(event) {
		event.stopPropagation();
		this.$materialSelectList.classList.remove("add-item__tag-select--active");
		this.$colourSelectList.classList.remove("add-item__tag-select--active");
		this.$generalSelectList.classList.add("add-item__tag-select--active");
	}

	onClickAddGeneralTag(event) {
		event.stopPropagation();
		const tagName = event.target.innerText;
		const tag = (tagName === "Add New...") ? this.$generalInput.value : tagName;
		this.addGeneralTag(tag);
	}

	addGeneralTag(tagName) {
		this.$generalInput.focus();
		if (!tagName) return;

		const tag = this.tagLists.general.getTagByName(tagName);
		if (tag) {
			this.tagLists.general.addTag(tag);
		}
		else {
			this.tagLists.general.addTag({ name: tagName, category: "general" });
		}

		const $tagDisplay = this.createTagDisplayItem(tagName, this.removeGeneralTag.bind(this));
		this.$generalDisplayList.appendChild($tagDisplay);

		this.$generalInput.value = "";
		this.loadGeneralSelectTags();
	}

	removeGeneralTag(event) {
		const $tagName = event.target.parentElement.querySelector(".tag-display__name");
		const tagName = $tagName.innerText;
		const tag = this.tagLists.general.getTags().find(tag => tag.name === tagName);
		if (tag) this.tagLists.general.removeTag(tag);

		this.$generalDisplayList.removeChild(event.target.parentElement);
		this.loadGeneralSelectTags();
	}

	// Submit New Item
	async submitData(event) {
		const data = this.getData();
		const imageFiles = new FormData();

		const file1 = this.$imageInputs[0].files[0];
		if (file1) {
			imageFiles.append("image1", file1);
			data.image1 = file1.name;
		}
		const file2 = this.$imageInputs[1].files[0];
		if (file2) {
			imageFiles.append("image2", file2);
			data.image2 = file2.name;
		}
		
		// Show Loading icon
		
		const success = await http.addStockItem(data, imageFiles);
		// Hide Loading icon
		if (success) {
			console.log("Item added.");
			location.reload();
		}
		else {
			// Show error message
			console.log("Error adding item.");
		}
	}
}
>>>>>>> 4b7ce3e5cba71339dbf2a044718e33a0ce46568c
