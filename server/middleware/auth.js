require("dotenv").config();

const jwt = require("jsonwebtoken");
const { finduserByEmail } = require("../controllers/authController");
const secret = process.env.AUTH_SECRET;

async function authenticate(req, res, next) {
  let token = req.cookies["auth.token"];

  if (!token) {
    return res.status(401).json("No Token");
  }
  try {
    token = jwt.verify(token, secret);
    const existingUser = await finduserByEmail(token.email);
    const user = {
      ...token,
      id: existingUser._id,
      image: existingUser.image,
    };
    req.user = user;
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
  next();
}

module.exports = authenticate;
