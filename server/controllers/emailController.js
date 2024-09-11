const sendEmail = require("../config/email/email");
const renderHtml = require("../config/email/template");
const bcrypt = require("bcryptjs");
const UserOtp = require("../model/userOtp");
const User=require("../model/userModel")

function codeGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}
async function sendEmailVerify(user_id) {
  const code = codeGenerator();
  const hashedOtp = await bcrypt.hash(code.toString(), 10);
  const  newUser=await User.findOne({_id:user_id})
  const userOtp = await UserOtp.create({
    user_id: newUser._id,
    otp: hashedOtp,
    expiresAt: new Date(Date.now() + 3600 * 1000),
  });

  const from = process.env.EMAIL_FROM;
  const to = newUser.email;
  const subject = "Welcome to Auth App 💻";
  const text = "Verify your account";
  const username = newUser.username;
  const html = await renderHtml(code, username, from);
  try {
    await sendEmail({ to, from, subject, text, html });
    return true;
  } catch (e) {
    console.error(e);
    return false
  }
}
module.exports = { codeGenerator,sendEmailVerify };
