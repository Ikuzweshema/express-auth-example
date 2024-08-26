const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_SECRET;
require("dotenv").config();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const UserOtp = require("../model/userOtp");
const { sendEmailVerify } = require("./emailController");


async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(401).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const username = user.username;
      const payload = { email, username };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json("authenticated");
    } else {
      return res.status(401).json({ message: "Invalid Username Or Password" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Something Went Wrong", error: e });
  }
}


async function addUser(req, res) {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("Email is already registered");
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hashed,
      username: username,
    });
    if (newUser) {
      try {
        if (await sendEmailVerify(newUser._id)) {
          return res.status(201).json(newUser);
        }
        throw Error("Email not sent");
        return;
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }
  } catch (e) {
    return res.status(500).json({ message: e.message, error: e });
  }
}

function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out" });
}

function getSession(req, res) {
  res.status(200).json(req.user);
}

async function VerifyUser(req, res) {
  const { id, code } = req.body;
  try {
    if (!id || !code) {
      throw Error("OTP code is required");
      return;
    }

    const verifyCode = await UserOtp.findOne({
      user_id: id,
    });

    if (!verifyCode) {
      throw new Error("Otp code doesn't exits or have been verified");
      return;
    }

    const { expiresAt, otp } = verifyCode;
    if (expiresAt < Date.now()) {
      await UserOtp.deleteMany({
        user_id: id,
      });
      throw new Error("Code has expired please request a new one");
      return;
    }
    const validOtp = await bcrypt.compare(code.toString(), otp);
    if (!validOtp) {
      throw new Error("Invalid OTP code");
      return;
    }
    await User.updateOne(
      { _id: id },
      {
        verifiedAt: Date.now(),
      },
    );
    const user = await User.findOne({ _id: id });

    await UserOtp.deleteMany({ user_id: id });
    const payload = {
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      status: "Verified",
      message: "User Email verified successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
}

async function resendOtp(req, res) {
  const { id } = req.body;
  try {
    if (!id) {
      throw Error("Id is required");
      return;
    }
    const exists = await User.findOne({ _id: id, verifiedAt: null });
    if (!exists) {
      throw new Error("User not found or has been verified");
      return;
    }
    await UserOtp.deleteMany({
      user_id: id,
    });
    if (await sendEmailVerify(id)) {
      const user = await User.findOne({ _id: id });
      return res.status(200).json({ message: `New OTP sent to ${user.email}` });
    }
    throw new Error("Email not sent");
    return;
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}
module.exports = {
  logout,
  login,
  getSession,
  addUser,
  VerifyUser,
  resendOtp,
};
