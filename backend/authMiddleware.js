const jwt = require("jsonwebtoken");
const config = require("config");

// authentication middleware
// check if the given jwt token is valid

const auth = (req, res, next) => {
  const token = req.header("x-auth");

  if (!token) {
    console.log(req);
    res.status(401).json({ msg: "Token Required" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized token" });
  }
};

module.exports = auth;
