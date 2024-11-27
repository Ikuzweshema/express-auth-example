require("dotenv/config");
const axios = require("axios");
const User = require("../model/userModel");
const Account = require("../model/account");
const jwt = require("jsonwebtoken");
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
function signIn(req, res) {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.AUTH_GOOGLE_ID}&redirect_uri=${process.env.AUTH_GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile`;

  res.redirect(authUrl);
}
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
async function handleCallback(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code not provided");
  }
  try {
    const token = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.AUTH_GOOGLE_ID,
      client_secret: process.env.AUTH_GOOGLE_SECRET,
      redirect_uri: process.env.AUTH_GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });
    const { access_token } = token.data;
    const profile = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const { email, name, picture } = profile.data;
    const existingUser = await User.findOne({
      email: email,
    });
    if (!existingUser) {
      const user = await User.create({
        email: email,
        username: name,
        image: picture,
        verifiedAt: new Date(Date.now()),
      });
      await Account.create({
        userId: user._id,
        provider: "google",
        acces_token: access_token,
      });
    }
    const payload = { email, name };
    const authToken = jwt.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("auth.token", authToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signIn, handleCallback };
