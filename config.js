const sqlite3 = require('sqlite3').verbose();

//opening database conetion
let db = new sqlite3.Database(__dirname + './db/acmeAtelierInventory.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    //returns if conecteted
    console.log('Connected to the in-memory SQlite database.');
});

//query data example
/*db.serialize(() => {
    db.each(`SELECT fabricID as id,
                    Name as name
             FROM tblFabric`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
*/

//close contection
/*
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
*/