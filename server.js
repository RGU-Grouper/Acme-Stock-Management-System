const express = require("express");
const stockRouter = require("./routes/stockRoutes.js");
const sequelize = require("./database.js");

const app = express();
const PORT = process.env.PORT || 2000;

// Connect to the database
sequelize.sync().then(() => console.log("Database connected."));

// Make JSON sent in the request body available as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves static resources from www folder
app.use(express.static(__dirname + '/WWW'));
app.use('/images', express.static('images'));

// Loads stock page
app.get('/', (req, res) => res.sendFile(__dirname + "/WWW/login.html"));

// HTTP request routes
app.use('/stock', stockRouter);

// Start server listening for HTTP requests
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));

// cmd to run: node server.js
// cmd to stop server running: ctrl + c
