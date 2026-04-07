const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistTokenschema");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Please Login first" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Please Login first" });
    }

    // blacklist check
    const tokenExist = await BlacklistToken.findOne({ token });
    if (tokenExist) {
      return res.status(403).json({
        message: "Token expired, login again..!",
      });
    }

    // verify
    const decoded = jwt.verify(
      token,
      "This-is-super-secret-string-which-can-be-anything"
    );

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};

module.exports = authMiddleware;