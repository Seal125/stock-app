/*
This page uses the json web token package to provide a token for the server to use to identify the user, and make sure that the same user
is logged in to show relevant data that's meant for that user.

It authenticates the user's token to make sure the token given to them is valid for that user.
*/

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({
    message: "Authentication error."
  });

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Invalid token."
    });
  }
};

module.exports = auth;