const getStockData = (req, res) => {

    //open data base
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.resolve(__dirname, '../db/acmeAtelierInventory.db')


    //opening database conetion
    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err.message);
        }
        //returns if conecteted
        console.log('Connected to the in-memory SQlite database.');
    });

    var row = 1;
    //SELECT from tblFabric
    db.each(`SELECT fabricID as id,
                    Name as name,
					Quanity as quantity,
					Image1 as img1,
					Image2 as img2,
					Image3 as img3,
             FROM tblFabric`, (err, row) => {

    });

    //SELECT from tblTags
    db.each(`SELECT Category as cat,
					name as Tag
	 		FROM tblTags`, (err, row) => {

    });

    console.log(toString(row.id));


    // const data = []; // get data from database
    const data = [{

            id: "0",
            name: "Hickory Stripe",
            quantity: 8,
            images: ["CottonDenimHickoryStripe-GreenandWhite1.png", "CottonDenimHickoryStripe-GreenandWhite2.png", "CottonDenimHickoryStripe-GreenandWhite3.png"],
            tagLists: {
                materials: ["Denim"],
                mainColours: ["Green"],
                highlightColours: ["White"],
            },
        },
        {
            id: "1",
            name: "Falling Petals",
            quantity: 12,
            images: ["DressmakingStretchTwill-FallingBurgundyPetals1.png", "DressmakingStretchTwill-FallingBurgundyPetals2.png", "DressmakingStretchTwill-FallingBurgundyPetals3.png"],
            tagLists: {
                materials: ["Stretch Twill"],
                mainColours: ["Red", "Blue"],
                highlightColours: [],
            },
        },
        {
            id: "2",
            name: "Striped White Weave",
            quantity: 10,
            images: ["LightweightBlackCotton-BigWhiteCheck1.png", "LightweightBlackCotton-BigWhiteCheck2.png", "LightweightBlackCotton-BigWhiteCheck3.png"],
            tagLists: {
                materials: ["Cotton"],
                mainColours: ["Black"],
                highlightColours: ["White"],
            },
        },
        {
            id: "3",
            name: "Polka Dots",
            quantity: 104,
            images: ["NavyBlueCotton-BigWhiteSpot1.png", "NavyBlueCotton-BigWhiteSpot2.png", "NavyBlueCotton-BigWhiteSpot3.png"],
            tagLists: {
                materials: ["Cotton"],
                mainColours: ["Blue"],
                highlightColours: ["White"],
            },
        },
        {
            id: "4",
            name: "Thin Stripe",
            quantity: 15,
            images: ["PolyCottonBagLining-BrownandBlueStripe1.png", "PolyCottonBagLining-BrownandBlueStripe2.png", "PolyCottonBagLining-BrownandBlueStripe3.png"],
            tagLists: {
                materials: ["Cotton", "Polyester"],
                mainColours: ["Brown", "Beige"],
                highlightColours: ["Blue", "Light Blue"],
            },
        },
        {
            id: "5",
            name: "Tartan",
            quantity: 6,
            images: ["tartan.jpg", "red.jpg"],
            tagLists: {
                materials: ["Wool 13oz"],
                mainColours: ["Green", "Blue"],
                highlightColours: ["Yellow", "Red", "Black"],
            },
        }
    ];

    //close the database
    res.status(200).json(data);
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Close the database connection.');
    });
    //
};

const addStockItem = (req, res) => {
    const data = req.body.data;

    // Validate data and add to database

    // Respond to client
    res.status(201).json(data);
};

const getStockItem = (req, res) => {
    const id = req.params.id;
    const data = { testing: id }; // get data from database with id
    res.status(200).json(data);
};

const updateStockItem = (req, res) => {
    const id = req.params.id;
    const data = req.body.data;
    res.status(200).json({ message: `Stock item ${id} updated.` });
};

const deleteStockItem = (req, res) => {
    const id = req.params.id;
    res.status(200).json({ message: `Stock item ${id} deleted.` });
};

module.exports = {
    getStockData,
    addStockItem,
    getStockItem,
    updateStockItem,
    deleteStockItem,
};