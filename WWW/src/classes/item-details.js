export default class ItemDetails {
	constructor() {
		this.$header = document.querySelector(".header");
		this.$itemDetails = document.querySelector(".item-details");
		this.$close = document.querySelector(".item-details__close");
		this.$image = document.querySelector(".item-details__image");
		this.$imagePreviews = document.querySelectorAll(".item-details__image-preview");
		this.$info = document.querySelector(".item-details__info");

		// Hide item details when X is clicked
		this.$close.addEventListener("click", this.hide.bind(this));
	}

	show(itemData) {
		const { images, name, quantity, tagLists } = itemData;
	
		// Show Item Details with transparent background
		this.$itemDetails.classList.add("item-details--active");
		this.$header.classList.add("header--hidden");
	
		// Set Images
		this.$image.src = "img/" + images[0];
		for (let i = 0; i < this.$imagePreviews.length; i++) {
			if (!images[i]) {
				this.$imagePreviews[i].src = "img/aa-logo-stamp.png";
			} else {
				this.$imagePreviews[i].src = "img/" + images[i];
			}
		}
	
		// Set Info
		this.$info.querySelector(".item-details__name").innerHTML = name;
		this.$info.querySelector(".item-details__quantity").innerHTML = quantity;
	}

	hide() {
		this.$itemDetails.classList.remove("item-details--active");
		this.$header.classList.remove("header--hidden");
	}
}
