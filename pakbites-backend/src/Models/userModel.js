const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.otp;
    delete ret.otpExpires;
    delete ret.__v;
    return ret;
  }
});
const User = mongoose.model("User", userSchema);

module.exports = User; 