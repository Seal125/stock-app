const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({
    message: "API connected successfully."
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Listening at port ${PORT}`);
});