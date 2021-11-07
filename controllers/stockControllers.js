const getStockData = (req, res) => {
	res.status(200).json({
		stock: ["testing1", "testing2", "testing3"],
	});
};

module.exports = {
	getStockData,
};
