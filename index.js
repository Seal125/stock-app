const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./routes/db");

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Successfully Connected"
  });
});

app.use("/signin", user);

app.listen(PORT, (req, res) => {
  console.log(`Listening at port ${PORT}`);
});