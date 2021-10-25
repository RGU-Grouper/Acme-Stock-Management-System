//import { names } from './config.js';
import { addItemPreview } from "./ui.js";

// Add Test Previews
const numTestPreviews = 10;
const testItem = {
    images: [
			"tartan.jpg",
		],
    name: "Tartan",
    colour: "Green",
    material: "Wool (Light)",
    quantity: "8m",
};

for (let i = 0; i < numTestPreviews; i++) addItemPreview(testItem);
