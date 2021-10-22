const stockListItems = document.querySelector(".stock-list__items");
const itemPreviewTemplate = document.getElementById("item-preview-template");

const addItemPreview = ({ image, name, colour, material, quantity }) => {
    const itemPreview = itemPreviewTemplate.content.cloneNode(true).firstElementChild;

    // Item Name
    itemPreview.children[0].src = "img/" + image;
    itemPreview.children[1].innerHTML = name;
    itemPreview.children[3].innerHTML = colour;
    itemPreview.children[5].innerHTML = material;
    itemPreview.children[7].innerHTML = quantity;

    stockListItems.appendChild(itemPreview);
};



// Add Test Previews
const numTestPreviews = 10;
const testItem = {
    image: "aa-logo-stamp.png",
    name: "Stripy Grey Pattern",
    colour: "Grey",
    material: "Cotton",
    quantity: "8m",
};


for (let i = 0; i < numTestPreviews; i++) addItemPreview(testItem);