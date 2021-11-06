const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

//loads stock page
app.get('/', (req, res) => res.sendFile(__dirname + "/WWW/index.html"));

//loads database
app.use(express.static(__dirname + "/config.js"));

app.use(express.static(__dirname + '/WWW')); //Serves resources from www folder

//cmd node server.js to run
//cmd ctrl c to stop server runing
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
