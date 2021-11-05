import StockItem from "./stock-item.js";
import EditItem from "./edit-item.js";
import ItemDetails from "./item-details.js";

export default class StockList {
	constructor(materialTags, colourTags, stockData) {
		this.stock = [];
		this.materialTags = materialTags;
		this.colourTags = colourTags;
		
		this.editItem = new EditItem(materialTags, colourTags);
		this.itemDetails = new ItemDetails();
				
		this.$stockListItems = document.querySelector(".stock-list__items");
		this.$itemPreviewTemplate = document.getElementById("item-preview-template");

		this.$addItemButton = document.querySelector(".header__add-item");
		this.$addItemButton.addEventListener("click", (event) => this.editItem.show());

		if (stockData) {
			this.setStock(stockData);
			this.loadStockList();
		}
	}

	addItemPreview(itemData) {
		// Add a card containing item details and image

		const { name, quantity, images } = itemData;

		// Create copy of item preview template
		const $itemPreview = this.$itemPreviewTemplate.content.cloneNode(true).firstElementChild;

		// Set item details
		$itemPreview.querySelector(".item-preview__image").src = "img/" + images[0];
		$itemPreview.querySelector(".item-preview__name").innerHTML = name;
		$itemPreview.querySelector(".item-preview__quantity-data").innerHTML = quantity;

		// Set click handler
		$itemPreview.addEventListener("click", (event) => this.itemDetails.show(itemData));

		// Add to DOM
		this.$stockListItems.appendChild($itemPreview);
	}

	loadStockList() {
		this.stock.forEach(item => this.addItemPreview(item));
	}

	getStock() {
		return this.stock;
	}

	setStock(data) {
		this.stock = data;
	}
	
	addStockItem(itemData) {
		const newItem = new StockItem(this.materialTags, this.colourTags, itemData);
		this.stock.push(newItem);
	}

	updateStockItem(id, data) {
		const stockItem = this.stock.find(item => item.id === id);
		if (stockItem) {
			stockItem.setData(data);
		}
		else {
			console.error(`Unable to update stock item - Stock item with id ${id} not found.`);
		}
	}

	removeStockItem(id) {
		const removeItem = this.stock.find(item => item.id === id);
		if (removeItem) {
			this.stock.splice(this.stock.findIndex(removeItem), 1);
		}
		else {
			console.error(`Unable to remove stock item - Stock item with id ${id} not found.`);
		}
	}

	getStockItemById(id) {
		return this.stock.find(item => item.id === id);
	}

	getStockItemByName(name) {
		return this.stock.find(item => item.name === name);
	}
}
