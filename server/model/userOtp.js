const mongoose = require("mongoose");
const { Schema } = mongoose;

const userOtpSchema = new Schema(
    {
        user_id: String,
        otp: String,
        expiresAt: Date,
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model("UserOtp", userOtpSchema);
