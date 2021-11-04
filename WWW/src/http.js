// Stock Data
export const getStockData = () => {
	const data = [
		{
			id: "0",
			name: "Tartan 1",
			quantity: 1,
			images: ["tartan.jpg"],
			tagLists: {
				materials: ["Wool"],
				mainColours: ["Red"],
				highlightColours: [],
			},
		},
		{
			id: "1",
			name: "Tartan 2",
			quantity: 2,
			images: ["tartan.jpg"],
			tagLists: {
				materials: ["Cotton"],
				mainColours: ["Green"],
				highlightColours: ["Red"],
			},
		},
		{
			id: "2",
			name: "Tartan 3",
			quantity: 3,
			images: ["tartan.jpg"],
			tagLists: {
				materials: ["Wool", "Cotton"],
				mainColours: [],
				highlightColours: ["Blue"],
			},
		},
		{
			id: "3",
			name: "Tartan 4",
			quantity: 4,
			images: ["tartan.jpg"],
			tagLists: {
				materials: ["Nylon", "Linen", "Wool", "Cotton"],
				mainColours: ["Yellow", "Purple", "Green"],
				highlightColours: ["Red", "Blue"],
			},
		},
		{
			id: "4",
			name: "Tartan 5",
			quantity: 5,
			images: ["tartan.jpg"],
			tagLists: {
				materials: [],
				mainColours: ["Brown"],
				highlightColours: ["Brown"],
			},
		},
		{
			id: "5",
			name: "Tartan 6",
			quantity: 6,
			images: ["tartan.jpg"],
			tagLists: {
				materials: ["Wool"],
				mainColours: ["Red", "Green"],
				highlightColours: ["Green", "Red"],
			},
		}
	];

	return data;
};

export const getStockItem = (id) => {};

export const addStockItem = (data) => {};

export const updateStockItem = (id, data) => {};

export const deleteStockItem = (id) => {};

// Tags
export const getMaterialTags = () => {
	return ["Wool", "Cotton", "Linen", "Nylon"];
};

export const addMaterialTag = (tag) => {

};

export const getColourTags = () => {
	return ["White", "Black", "Red", "Green", "Blue", "Yellow", "Orange", "Pink", "Purple", "Brown"];
};

export const addColourTag = (tag) => {

};
