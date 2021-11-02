import AddItemUI from "./add-item-ui.js";

// Get Tags from database via server
const materialTags = ["Wool", "Cotton", "Linen", "Nylon"];
const colourTags = ["White", "Black", "Red", "Green", "Blue", "Yellow", "Orange", "Pink", "Purple", "Brown"];

const addItem = new AddItemUI(materialTags, colourTags);
