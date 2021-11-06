const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => res.sendFile(__dirname + "/WWW/index.html"));

//cmd node server.js to run
app.listen(PORT, () => console.log(`Server is listening on port at http://localhost:${PORT}`));
