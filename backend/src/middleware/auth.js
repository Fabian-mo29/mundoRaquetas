const jwt = require("jsonwebtoken");
const secretKey = "rkn903EWNKJEW9#%";

function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

function generateToken(user) {
  return jwt.sign({ Id: user.Id, username: user.Username }, secretKey, {});
}

module.exports = {
  verifyToken,
  generateToken,
};
