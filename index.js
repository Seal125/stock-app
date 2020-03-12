const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitMongoServer = require("./database/db");

InitMongoServer();

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "API connected successfully."
  });
});

app.use("/user", user);


app.listen(port, (req, res) => {
  console.log(`Listening at port ${port}`);
});