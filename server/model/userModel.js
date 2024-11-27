const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    image:{
    type:String,
    required:false
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    
  },
  {
    timestamps: true,
  },
);
const User = new mongoose.model("User", userSchema);

module.exports = User;
