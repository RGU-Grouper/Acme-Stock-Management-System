const getStockData = (req, res) => {
	// const data = []; // get data from database
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
	res.status(200).json(data);
};

const addStockItem = (req, res) => {
	const data = req.body.data;
	console.log(data);

	// Validate data and add to database

	// Respond to client
	res.status(201).json({
		testing: "test",
	});
};

const getStockItem = (req, res) => {
	const id = req.body.id;
	const data = {}; // get data from database with id
	res.status(200).json(data);
};

const updateStockItem = (req, res) => {
	const id = req.body.id;
	const data = req.body.data;
	res.status(200);
};

const deleteStockItem = (req, res) => {
	const id = req.body.id;
	res.status(200);
};

module.exports = {
	getStockData,
	addStockItem,
	getStockItem,
	updateStockItem,
	deleteStockItem,
};
