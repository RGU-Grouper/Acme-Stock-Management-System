const getStockData = (req, res) => {
	res.status(200).json({
		stock: ["testing1", "testing2", "testing3"],
	});
};

const addStockItem = (req, res) => {
	// Add item to database
	res.status(201).json({
		testing: "test",
	});
};

module.exports = {
	getStockData,
	addStockItem,
};
