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

export const addStockItem = async (data, imageFiles) => {
	// POST data to server
	const response1 = await fetch("/stock", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	if (!response1.ok) return false;
	if (!imageFiles) return true;
	
	// POST image files to server
	const response2 = await fetch("/stock/image", {
		method: "POST",
		body: imageFiles,
	});

	return response2.ok;
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
export const getTags = async () => {
	const res = await fetch("/tags");
	const data = await res.json();
	return data;
};

export const addTag = async (data) => {
	const res = await fetch("/tags", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const deleteTag = async (id) => {
	const res = await fetch(`/tags/${id}`, { method: "DELETE" });
	return res.ok;
};

export const getMaterialTags = async () => {
	const res = await fetch("/tags/material");
	const data = await res.json();
	return data;
};

export const addMaterialTag = async (data) => {
	const res = await fetch("/tags/material", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const getColourTags = async () => {
	const res = await fetch("/tags/colour");
	const data = await res.json();
	return data;
};

export const addColourTag = async (data) => {
	const res = await fetch("/tags/colour", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};

export const getGeneralTags = async () => {
	const res = await fetch("/tags/general");
	const data = await res.json();
	return data;
};

export const addGeneralTag = async (data) => {
	const res = await fetch("/tags/general", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	return res.ok;
};
