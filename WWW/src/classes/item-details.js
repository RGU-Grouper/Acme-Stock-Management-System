export default class ItemDetails {
	constructor() {
		this.$header = document.querySelector(".header");
		this.$itemDetails = document.querySelector(".item-details");
		this.$close = document.querySelector(".item-details__close");
		this.$image = document.querySelector(".item-details__image");
		this.$imagePreviews = document.querySelectorAll(".item-details__image-preview");
		this.$details = document.querySelector(".item-details__details");
		this.$materialsTags = document.getElementById("item-details-materials");
		this.$mainColoursTags = document.getElementById("item-details-main-colours");
		this.$highlightColoursTags = document.getElementById("item-details-highlight-colours");

		// Hide item details when X is clicked
		this.$close.addEventListener("click", this.hide.bind(this));
	}

	show(itemData) {
		const { images, name, quantity, tagLists } = itemData;
	
		// Show Item Details with transparent background
		this.$itemDetails.classList.add("item-details--active");
		this.$header.classList.add("header--hidden");
	
		// Set Images
		// this.$image.src = "img/" + images[0];
		for (let i = 0; i < this.$imagePreviews.length; i++) {
			if (!images[i]) {
				this.$imagePreviews[i].src = "img/aa-logo-stamp.png";
			} else {
				this.$imagePreviews[i].src = "img/" + images[i];
			}
		}

		// Set Tags
		this.clearTags();
		tagLists.materials.forEach(tag => this.addMaterialsTag(tag));
		tagLists.mainColours.forEach(tag => this.addMainColoursTag(tag));
		tagLists.highlightColours.forEach(tag => this.addHighlightColoursTag(tag));
		
		// Set Info
		this.$details.querySelector(".item-details__name").innerHTML = name;
		this.$details.querySelector(".item-details__quantity-data").innerHTML = quantity;
	}

	hide() {
		this.$itemDetails.classList.remove("item-details--active");
		this.$header.classList.remove("header--hidden");
	}

	createTagElement(tag) {
		const $tag = document.createElement("li");
		$tag.classList.add("item-details__tag");
		$tag.innerHTML = tag;
		return $tag;
	}

	clearTags() {
		while (this.$materialsTags.firstChild) {
			this.$materialsTags.removeChild(this.$materialsTags.lastChild);
		}
		while (this.$mainColoursTags.firstChild) {
			this.$mainColoursTags.removeChild(this.$mainColoursTags.lastChild);
		}
		while (this.$highlightColoursTags.firstChild) {
			this.$highlightColoursTags.removeChild(this.$highlightColoursTags.lastChild);
		}
	}

	addMaterialsTag(tag) {
		const $tag = this.createTagElement(tag);
		this.$materialsTags.appendChild($tag);
	}

	addMainColoursTag(tag) {
		const $tag = this.createTagElement(tag);
		this.$mainColoursTags.appendChild($tag);
	}

	addHighlightColoursTag(tag) {
		const $tag = this.createTagElement(tag);
		this.$highlightColoursTags.appendChild($tag);
	}
}
