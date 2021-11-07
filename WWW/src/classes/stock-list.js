import StockItem from "./stock-item.js";
import AddItem from "./add-item.js";
import ItemDetails from "./item-details.js";

export default class StockList {
	constructor(materialTags, colourTags, stockData) {
		this.stock = [];
		this.materialTags = materialTags;
		this.colourTags = colourTags;
		
		this.addItem = new AddItem(materialTags, colourTags);
		this.itemDetails = new ItemDetails(materialTags, colourTags);
		
		this.$stockListItems = document.querySelector(".stock-list__items");
		this.$itemPreviewTemplate = document.getElementById("item-preview-template");

		this.$toggleOptions = document.querySelector(".header__toggle-options");
		this.$stockOptions = document.querySelector(".header__stock-options");
		this.$toggleOptions.addEventListener("click", (event) => {
			this.$toggleOptions.classList.toggle("header__toggle-options--active");
			this.$stockOptions.classList.toggle("header__stock-options--active");
		});

		this.$searchInput = document.querySelector(".header__search");
		this.$searchInput.addEventListener("input", (event) => this.loadStockList(this.$searchInput.value));

		this.$addItemButton = document.querySelector(".header__add-item");
		this.$addItemButton.addEventListener("click", (event) => this.addItem.show());

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

	loadStockList(filterString) {
		while (this.$stockListItems.firstChild) {
			this.$stockListItems.removeChild(this.$stockListItems.lastChild);
		}

		if (filterString) {
			const filteredStock = this.stock.filter(item => item.name.match(new RegExp(filterString, "i")));
			const startItems = filteredStock.map(item => item.name.substring(0, filterString.length).toLowerCase() === filterString.toLowerCase() ? item : null).filter(item => item != null);
			const endItems = filteredStock.filter(item => !startItems.includes(item));
			const sortedStock = startItems.concat(endItems);
			sortedStock.forEach(item => this.addItemPreview(item));
		}
		else {
			this.stock.forEach(item => this.addItemPreview(item.getData()));
		}

		if (!this.$stockListItems.firstChild) {
			const $noItems = document.createElement("li");
			$noItems.classList.add("stock-list__no-items");
			$noItems.innerText = "No stock found!";
			this.$stockListItems.appendChild($noItems);
		}
	}

	getStock() {
		return this.stock;
	}

	setStock(data) {
		data.forEach(item => {
			this.addStockItem(item);
		});
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
