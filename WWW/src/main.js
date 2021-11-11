import StockList from "./classes/stock-list.js";
import * as http from "./http.js";

/* ON PAGE LOAD */
const materialTags = http.getMaterialTags();
const colourTags = http.getColourTags();
const generalTags = http.getGeneralTags();
const stockData = await http.getStockData();

/* ON DATA RECEIVED */
const stockList = new StockList(materialTags, colourTags, generalTags, stockData);
