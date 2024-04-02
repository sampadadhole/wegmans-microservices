//access the utils folder
const CustomerService = require("../../services/customerService");
const getUserSession = require("../../services/customerService");
const jwt = require("jsonwebtoken");
async function restrictToLoggedInUserOnly(req, res, next) {
  const service = new CustomerService();
  const userUid = req.cookies.uid;
  console.log({ req });
  if (!userUid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await service.getUserSession(userUid);
  console.log({ user });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  req.user = user;
  next();
}

async function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], "microservices_secret");
    req.body._id = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

module.exports = { verifyToken };
