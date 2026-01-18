const jwt = require("jsonwebtoken");


function generateToken(user, res) {
  const token = jwt.sign(
    { id: user._id, email: user.email,role:user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN }
  );
  res.cookie("token", token, {
    httpOnly: true,  
    secure: false,   
    sameSite: "strict",
    maxAge: 60 * 60 * 1000 
  });
  return token;
}



module.exports = { generateToken};
