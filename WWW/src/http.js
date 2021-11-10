// Stock Data
export const getStockData = async () => {
	const res = await fetch("/stock");
	const data = await res.json();
	return data;
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
	return ["Wool 13oz", "Wool 16oz", "Cotton", "Polyester", "Demin", "Stretch Twill", "Nylon"];
	// const res = await fetch("/tags/material");
	// const data = await res.json();
	// return data;
};

export const addMaterialTag = async (data) => {
	const res = await fetch("/tags/material", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const getColourTags = () => {
	return ["White", "Black", "Red", "Green", "Blue", "Light Blue", "Yellow", "Orange", "Pink", "Purple", "Brown", "Beige"];
	// const res = await fetch("/tags/colour");
	// const data = await res.json();
	// return data;
};

export const addColourTag = async (data) => {
	const res = await fetch("/tags/colour", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const getGeneralTags = () => {
	return ["Traditional", "Modern", "Formal", "Casual"];
	// const res = await fetch("/tags/general");
	// const data = await res.json();
	// return data;
};

export const addGeneralTag = async (data) => {
	const res = await fetch("/tags/general", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};
