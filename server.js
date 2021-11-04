const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => res.sendFile("./WWW/index.html"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
