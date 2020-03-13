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
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: "Invalid token."
    });
  }
};

module.exports = auth;