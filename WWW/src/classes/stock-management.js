import StockList from "./stock-list.js";
import EditItem from "./edit-item.js";
import ItemDetails from "./item-details.js";

export default class StockManagement {
	constructor(materialTags, colourTags, stockData) {
		this.editItem = new EditItem(materialTags, colourTags);
		this.itemDetails = new ItemDetails();
		this.stockList = new StockList(materialTags, colourTags, stockData);
				
		this.$stockListItems = document.querySelector(".stock-list__items");
		this.$itemPreviewTemplate = document.getElementById("item-preview-template");
		this.stockList.stock.forEach(item => this.addItemPreview(item));

		this.$addItemButton = document.querySelector(".header__add-item");
		this.$addItemButton.addEventListener("click", (event) => this.editItem.show());
	}
		
	addItemPreview(itemData) {
		// Add a card containing item details and image

		const { name, quantity, images, tagLists } = itemData;

		// Create copy of item preview template
		const $itemPreview = this.$itemPreviewTemplate.content.cloneNode(true).firstElementChild;

		// Set item details
		$itemPreview.querySelector(".item-preview__image").src = "img/" + images[0];
		$itemPreview.querySelector(".item-preview__name").innerHTML = name;
		$itemPreview.querySelector(".item-preview__quantity").innerHTML = quantity;

		// Set click handler
		$itemPreview.addEventListener("click", (event) => this.itemDetails.show(itemData));

		// Add to DOM
		this.$stockListItems.appendChild($itemPreview);
	}
}
