//opening database
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
    db.run(`INSERT INTO tblFabric(Name, Image1, Image2 ) VALUES(${n}, ${ione}, ${itwo}`), function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      };

      db.run(`INSERT INTO tblCatalogue(fabricID, tagID) VALUES(${f}, ${t}`), function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      };

    // Respond to client
    res.status(201).json(data);
};

//add tag item
/*
db.run(`INSERT INTO tblTag(Name, Category) VALUES(${}, ${})`, ['C'], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
*/

const getStockItem = (req, res) => {
    const id = req.params.id;
    const data = { testing: id }; // get data from database with id

    let sql = `SELECT fabricID fabric,
                        Name name,
                        Image1 img1,
                        Image2 img2
                    FROM tblFabric
                    WHERE fabricID = ${id}`;

    db.each(sql, (err, row) => {
        if (err) {
            throw err;
        }
        console.log(`${row.fabric} ${row.name} ${row.img1} ${row.img2}`);
    });

    let catsql = `SELECT catalogueID id,
                        fabricID fabric,
                        tagID tag
                    FROM tblCatalogue
                    WHERE fabricID = ${id}`;

    db.each(catsql, (err, catrow) => {
        if (err) {
            throw err;
        }
        console.log(`${tagrow.tag} ${tagrow.cat} ${tagrow.tagname}`);
    });

    res.status(200).json(data);
};

const updateStockItem = (req, res) => {
    const id = req.params.id;
    const data = req.body.data;


    const sql = `UPDATE tblFabric SET Name = ${n}, Image1 = ${ione}, Image2 =${itwo} WHERE = ${id}`

    db.run(sql, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });

    res.status(200).json({ message: `Stock item ${id} updated.` });
};

const deleteStockItem = (req, res) => {
    const id = req.params.id;

    db.run(`DELETE FROM tblFabric WHERE fabricID=${id}`, id, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });

    db.run(`DELETE FROM tblCatalogue WHERE fabricID=${id}`, id, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });

    res.status(200).json({ message: `Stock item ${id} deleted.` });
};

//add delete tag item
/*
    db.run(`DELETE FROM tbltag WHERE tagID=${id}`, id, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) deleted ${this.changes}`);
    });
*/


module.exports = {
    getStockData,
    addStockItem,
    getStockItem,
    updateStockItem,
    deleteStockItem,
};

//close the database
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});