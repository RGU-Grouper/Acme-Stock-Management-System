const sqlite3 = require('sqlite3').verbose();

//opening database conetion
let db = new sqlite3.Database(__dirname + '/db/acmeAtelierInventory.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    //returns if conecteted
    console.log('Connected to the in-memory SQlite database.');
});

//query data
/*db.serialize(() => {
    db.each(`SELECT PlaylistId as id,
                    Name as name
             FROM playlists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
*/

//close contection
//db.close()