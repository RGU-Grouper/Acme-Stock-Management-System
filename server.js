const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//app.get('/', (req, res) => res.sendFile(__dirname + "/WWW/login.html"));

//loading getting all files
fs.readdir(
    path.resolve(__dirname, 'WWW'),
    (err, files) => {
      if (err) throw err;
      
      for (let file of files) {
        app.get('/', (req, res) => res.sendFile(__dirname + "/WWW/" +file));
      }
    }
  );

//cmd node server.js to run
//cmd ctrl c to stop server runing
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
