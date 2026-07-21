const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../Utils/jwt");
const sendMail = require("../Utils/nodemailer");


module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires
    });

    await newUser.save();

    const subject = "Email Verification - PakBites";
    const html = `<h1>Verify your email</h1><p>Your OTP is: <strong>${otp}</strong></p><p>It will expire in 10 minutes.</p>`;
    await sendMail(email, subject, `Your OTP is: ${otp}`, html);

    return res.status(201).json({
      message: "Registration successful. Please check your email for OTP.",
      userId: newUser._id
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Registration failed" });
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user, res);

    return res.status(200).json({
      message: "Email verified successfully",
      user: user,
      token
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "OTP verification failed" });
  }
};


module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email or password is incorrect." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or password is incorrect." });
    }

    const token = generateToken(user, res);

    return res.status(200).json({
      message: "Login successful",
      user: user,
      token
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Login failed" });
  }
};


module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Logout failed" });
  }
};


module.exports.getProfile = async (req, res) => {
  try {
    if (!req.user.name) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    return res.status(200).json({ user:req.user,success:true,message:"Get Profile Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if(!allUsers){
      return res.status(404).json({message:"Users not found"})
    }
     return res.status(200).json({message:"Users found successfully",users:allUsers,success:true});
   
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
};


module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const toDelete = await User.findByIdAndDelete(id)
    if (!toDelete) {
      return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ message: "User delete successfully" })

  } catch (error) {
    return res.status(500).json({ Error: error.message })
  }

};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
 
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRole = user.role === "admin" ? "user" : "admin";
    user.role = newRole;
    await user.save();

    return res.status(200).json({ message: `User role updated to ${newRole}` });
  } catch (error) {

    return res.status(500).json({ Error: error.message });
  }
};
