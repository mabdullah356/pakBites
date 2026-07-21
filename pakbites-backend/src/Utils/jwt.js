const jwt = require("jsonwebtoken");


function generateToken(user, res) {
  const token = jwt.sign(
    { id: user._id, email: user.email,role:user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN }
  );
  const maxAgeMs = 3 * 24 * 60 * 60 * 1000;
  res.cookie("token", token, {
    httpOnly: true,  
    secure: process.env.NODE_ENV === "production",   
    sameSite: "strict",
    maxAge: maxAgeMs
  });
  return token;
}



module.exports = { generateToken};
