import StockManagement from "./classes/stock-management.js";
import * as http from "./http.js";

/* ON PAGE LOAD */
const materialTags = http.getMaterialTags();
const colourTags = http.getColourTags();
const stockData = http.getStockData();

/* ON DATA RECEIVED */
const stockList = new StockManagement(materialTags, colourTags, stockData);
