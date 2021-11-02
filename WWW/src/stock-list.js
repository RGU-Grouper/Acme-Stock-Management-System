const $itemPreviewTemplate = document.getElementById("item-preview-template");
const $stockListItems = document.querySelector(".stock-list__items");

const $itemDetailsBackground = document.querySelector(".item-details__background");
const $itemDetails = document.querySelector(".item-details");
const $itemDetailsImage = document.querySelector(".item-details__image");
const $itemDetailsImagePreviews = document.querySelectorAll(".item-details__image-preview");
const $itemDetailsInfo = document.querySelector(".item-details__info");
const $itemDetailsClose = document.querySelector(".item-details__close");

const showItemDetails = (itemData) => {
	const { images, name, colour, material, quantity } = itemData;

	// Show Item Details with transparent background
	$itemDetailsBackground.classList.add("item-details__background--active");

	// Set Name

	// Set Images
	$itemDetailsImage.src = "img/" + images[0];
	for (let i = 0; i < $itemDetailsImagePreviews.length; i++) {
		if (!images[i]) {
			$itemDetailsImagePreviews[i].src = "img/aa-logo-stamp.png";
		} else {
			$itemDetailsImagePreviews[i].src = "img/" + images[i];
		}
	}

	// Set Info
	$itemDetailsInfo.children[0].innerHTML = name;
	$itemDetailsInfo.children[2].innerHTML = colour;
	$itemDetailsInfo.children[4].innerHTML = material;
	$itemDetailsInfo.children[6].innerHTML = quantity;
};

const hideItemDetails = () => {
	$itemDetailsBackground.classList.remove("item-details__background--active");
};

// Add a card containing item details and image
const addItemPreview = (itemData) => {
	const { images, name, colour, material, quantity } = itemData;

	// Create copy of item preview template
	const $itemPreview = $itemPreviewTemplate.content.cloneNode(true).firstElementChild;

	// Set item details
	$itemPreview.children[0].src = "img/" + images[0];
	$itemPreview.children[1].innerHTML = name;
	$itemPreview.children[3].innerHTML = colour;
	$itemPreview.children[5].innerHTML = material;
	$itemPreview.children[7].innerHTML = quantity;

	// Set click handler
	$itemPreview.addEventListener("click", (event) => showItemDetails(itemData));

	// Add to DOM
	$stockListItems.appendChild($itemPreview);
};

// Hide item details when background is clicked
$itemDetailsBackground.addEventListener("click", hideItemDetails);
$itemDetails.addEventListener("click", (event) => event.stopPropagation());

// Hide item details when X is clicked
$itemDetailsClose.addEventListener("click", hideItemDetails);

// Add Test Previews
const numTestPreviews = 20;
const testItem = {
	images: ["tartan.jpg"],
	name: "Tartan",
	colour: "Green",
	material: "Wool (Light)",
	quantity: "8m",
};

for (let i = 0; i < numTestPreviews; i++) addItemPreview(testItem);
