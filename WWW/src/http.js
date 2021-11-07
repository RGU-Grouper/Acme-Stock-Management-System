// Stock Data
export const getStockData = () => {
	const data = [
		{
			id: "0",
			name: "Tartan 1",
			quantity: 1,
			images: ["tartan.jpg", "red.jpg", "purple.jpg"],
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
			images: ["red.jpg"],
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
			images: ["purple.jpg"],
			tagLists: {
				materials: ["Nylon", "Linen", "Wool", "Cotton"],
				mainColours: ["Yellow", "Purple", "Green"],
				highlightColours: ["Red", "Blue"],
			},
		},
		{
			id: "4",
			name: "Find Me",
			quantity: 5,
			images: ["tartan.jpg", "red.jpg", "purple.jpg"],
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
	return data.concat(data.concat(data));

	// const res = await fetch("/stock");
	// const data = await res.json();
	// return data;
};

export const getStockItem = async (id) => {
	const res = await fetch(`/stock/${id}`);
	const data = await res.json();
	return data;
};

export const addStockItem = async (data) => {
	const res = await fetch("/stock", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const updateStockItem = async (id, data) => {
	const res = await fetch(`/stock/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const deleteStockItem = async (id) => {
	const res = await fetch(`/stock/${id}`, { method: "DELETE" });
	return res.ok;
};

// Tags
export const getMaterialTags = () => {
	return ["Wool", "Cotton", "Linen", "Nylon"];
	// const res = await fetch("/tags/materials");
	// const data = await res.json();
	// return data;
};

export const addMaterialTag = async (data) => {
	const res = await fetch("/tags/materials", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const getColourTags = () => {
	return ["White", "Black", "Red", "Green", "Blue", "Yellow", "Orange", "Pink", "Purple", "Brown"];
	// const res = await fetch("/tags/colours");
	// const data = await res.json();
	// return data;
};

export const addColourTag = async (data) => {
	const res = await fetch("/tags/colours", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};
