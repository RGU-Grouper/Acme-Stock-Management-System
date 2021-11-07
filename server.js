const express = require("express");
const stockRouter = require("./routes/stockRoutes.js");

const app = express();
const PORT = process.env.PORT || 2000;

// Make JSON sent in the request body available as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//loads stock page
app.get('/', (req, res) => res.sendFile(__dirname + "/WWW/index.html"));

//loads database
app.use(express.static(__dirname + "/config.js"));

//Serves resources from www folder
app.use(express.static(__dirname + '/WWW'));

app.use('/stock', stockRouter);

//cmd node server.js to run
//cmd ctrl c to stop server runing
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
