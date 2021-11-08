//opening database
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/acmeAtelierInventory.db')

//opening database conetion
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
    //returns if conecteted
    console.log('Connected to the in-memory SQlite database.');
});

const getStockData = (req, res) => {

    //get all data from fabric table
    let sql = `SELECT fabricID fabric,
                        Name name,
                        Image1 img1,
                        Image2 img2
                    FROM tblFabric`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach((row) => {
            console.log(`${row.fabric} ${row.name} ${row.img1} ${row.img2}`);
        });
    });

    //get all data from tag table
    let tagsql = `SELECT TagID tag,
                        Category cat,
                        Name tagname
                    FROM tblTags`;

    db.all(tagsql, [], (err, tagrows) => {
        if (err) {
            return console.error(err.message);
        }
        tagrows.forEach((tagrow) => {
            console.log(`${tagrow.tag} ${tagrow.cat} ${tagrow.tagname}`);
        });
    });

    // get tag - fabric links from tblcatalogue
    let catsql = `SELECT catalogueID id,
                        fabricID fabric,
                        tagID tag
                    FROM tblCatalogue`;

    db.all(catsql, [], (err, tagrows) => {
        if (err) {
            return console.error(err.message);
        }
        tagrows.forEach((catrow) => {
            console.log(`${catrow.id} ${catrow.fabric} ${catrow.tag}`);
        });
    });




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

    res.status(200).json(data);
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