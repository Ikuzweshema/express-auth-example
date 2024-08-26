require("dotenv").config();

const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_SECRET;
function authenticate(req, res, next) {
  let token = req.cookies.token;

  if (!token) {
    return res.status(401).json("No Token");
  }
  try {
    req.user = jwt.verify(token, secret);
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
  next();
}

module.exports = authenticate;
