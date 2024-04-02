//access the utils folder
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  // console.log({ req });
  console.log("req.params.id", req.params.id);
  console.log("req.id", req.id);
  const token = req.header("Authorization");
  console.log({ token });
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], "microservices_secret");
    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = verifyToken;
