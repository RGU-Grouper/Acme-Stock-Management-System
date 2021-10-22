var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "acmeAtelierInventory"
});

con.connect(function(err) {
    if (err) throw err;
    //Select all fablic names and return the result object:
    con.query("SELECT names FROM tblFabic", function(err, result, fields) {
            if (err) throw err;
            var names = console.log(result);
        })
        //Select all fablic quatities and return the result object:
    con.query("SELECT quatity FROM tblFabic", function(err, result, fields) {
            if (err) throw err;
            var quatity = console.log(result);
        })
        //Select all image names and return the result object:
    con.query("SELECT image1 FROM tblFabic", function(err, result, fields) {
        if (err) throw err;
        var image1 = console.log(result);
    })
    con.query("SELECT image2 FROM tblFabic", function(err, result, fields) {
        if (err) throw err;
        var image2 = console.log(result);
    })
    con.query("SELECT image3 FROM tblFabic", function(err, result, fields) {
        if (err) throw err;
        var image3 = console.log(result);
    })

})