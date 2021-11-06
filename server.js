const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => res.sendFile(__dirname + "/WWW/login.html"));

app.use(express.static(__dirname + '/WWW')); //Serves resources from public folder

//cmd node server.js to run
//cmd ctrl c to stop server runing
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
