import StockItem from "./stock-item.js";
import AddItem from "./add-item.js";
import ItemDetails from "./item-details.js";

export default class StockList {
	constructor(materialTags, colourTags, generalTags, stockData) {
		this.stock = [];
		this.materialTags = materialTags;
		this.colourTags = colourTags;
		this.generalTags = generalTags;
		
		this.addItem = new AddItem(materialTags, colourTags, generalTags);
		this.itemDetails = new ItemDetails(materialTags, colourTags, generalTags);
		
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

	createTagElement(tag) {
		const $tag = document.createElement("li");
		$tag.classList.add("item-preview__tag");
		$tag.innerHTML = tag.name;
		return $tag;
	}

	addItemPreview(itemData) {
		// Add a card containing item details and image

		const { name, image1, tagLists } = itemData;

		// Create copy of item preview template
		const $itemPreview = this.$itemPreviewTemplate.content.cloneNode(true).firstElementChild;

		// Set item details
		const filePath = (image1) ? `images/${image1}` : "img/placeholder.png";
		$itemPreview.querySelector(".item-preview__image").src = filePath;
		$itemPreview.querySelector(".item-preview__name").innerHTML = name;
		tagLists.material.forEach(tag => {
			const $tag = this.createTagElement(tag);
			$itemPreview.querySelector(".item-preview__tag-list").appendChild($tag);
		});

		// Set click handler
		$itemPreview.addEventListener("click", (event) => this.itemDetails.show(itemData));

		// Add to DOM
		this.$stockListItems.appendChild($itemPreview);
	}

	filterStock(filterString) {
		return this.stock.filter(item => item.getAllCurrentTags().map(t => t.name).join(".").match(new RegExp(filterString, "i")));
	}

	loadStockList(filterString) {
		while (this.$stockListItems.firstChild) {
			this.$stockListItems.removeChild(this.$stockListItems.lastChild);
		}

		if (filterString) {
			this.filterStock(filterString).forEach(item => this.addItemPreview(item.getData()));
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
		data.forEach(item => this.addStockItem(item));
	}
	
	addStockItem(itemData) {
		const newItem = new StockItem(this.materialTags, this.colourTags, this.generalTags, itemData);
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
