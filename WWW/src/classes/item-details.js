import EditItem from "./edit-item.js";

export default class ItemDetails {
	constructor(materialTags, colourTags, generalTags) {
		this.itemData = {
			name: "",
			image1: "",
			image2: "",
			tagLists: {
				material: [],
				colour: [],
				general: [],
			},
		};
		this.editItem = new EditItem(materialTags, colourTags, generalTags);
		this.$header = document.querySelector(".header");
		this.$itemDetails = document.querySelector(".item-details");
		this.$image = document.querySelector(".item-details__image");
		this.$imagePreviews = document.querySelectorAll(".item-details__image-preview");
		this.$details = document.querySelector(".item-details__details");
		this.$materialTags = document.getElementById("item-details-material");
		this.$colourTags = document.getElementById("item-details-colour");
		this.$generalTags = document.getElementById("item-details-general");
		this.$close = document.querySelector(".item-details__close");
		this.$edit = document.querySelector(".item-details__edit");

		this.$imageView = document.querySelector(".image-view");
		this.$imageViewImage = document.querySelector(".image-view__image");

		// Show Full Screen Image View when preview is clicked
		this.$imagePreviews.forEach($preview => {
			$preview.addEventListener("click", (event) => this.showImageView($preview));
		});

		// Hide Full Screen Image View when it is clicked
		this.$imageView.addEventListener("click", (event) => this.hideImageView());

		// Hide item details when close button is clicked
		this.$close.addEventListener("click", (event) => this.hide());

		// Show edit item pop-up when edit button is clicked
		this.$edit.addEventListener("click", (event) => this.editItem.show(this.itemData));
	}

	show(itemData) {
		this.itemData = itemData;
		this.editItem.setData(itemData);
		const { name, quantity, image1, image2, tagLists } = itemData;
	
		// Show Item Details with transparent background
		this.$itemDetails.classList.add("item-details--active");
		this.$header.classList.add("header--hidden");
	
		// Set Images
		const filePath1 = (image1) ? `images/${image1}` : "img/placeholder.png";
		this.$imagePreviews[0].src = filePath1;

		const filePath2 = (image2) ? `images/${image2}` : "img/placeholder.png";
		this.$imagePreviews[1].src = filePath2;

		// Set Tags
		this.clearTags();
		tagLists.material.forEach(tag => this.addMaterialTag(tag));
		tagLists.colour.forEach(tag => this.addColourTag(tag));
		tagLists.general.forEach(tag => this.addGeneralTag(tag));
		
		// Set Info
		this.$details.querySelector(".item-details__name").innerHTML = name;
		this.$details.querySelector(".item-details__quantity-data").innerHTML = quantity;
	}

	hide() {
		this.$itemDetails.classList.remove("item-details--active");
		this.$header.classList.remove("header--hidden");
	}

	showImageView($preview) {
		this.$imageView.classList.add("image-view--active");
		this.$imageViewImage.src = $preview.src;
	}

	hideImageView() {
		this.$imageView.classList.remove("image-view--active");
	}

	createTagElement(tag) {
		const $tag = document.createElement("li");
		$tag.classList.add("item-details__tag");
		$tag.innerHTML = tag.name;
		return $tag;
	}

	clearTags() {
		while (this.$materialTags.firstChild) {
			this.$materialTags.removeChild(this.$materialTags.lastChild);
		}
		while (this.$colourTags.firstChild) {
			this.$colourTags.removeChild(this.$colourTags.lastChild);
		}
		while (this.$generalTags.firstChild) {
			this.$generalTags.removeChild(this.$generalTags.lastChild);
		}
	}

	addMaterialTag(tag) {
		const $tag = this.createTagElement(tag);
		this.$materialTags.appendChild($tag);
	}

	addColourTag(tag) {
		const $tag = this.createTagElement(tag);
		this.$colourTags.appendChild($tag);
	}

	addGeneralTag(tag) {
		const $tag = this.createTagElement(tag);
		this.$generalTags.appendChild($tag);
	}
}
