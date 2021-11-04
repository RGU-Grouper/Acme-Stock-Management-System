import StockItem from "./stock-item.js";

export default class StockList {
	constructor(materialTags, colourTags, stockData, showItemDetails) {
		this.stock = [];
		this.materialTags = materialTags;
		this.colourTags = colourTags;
		this.showItemDetails = showItemDetails;

		if (stockData) this.setStock(stockData);
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
