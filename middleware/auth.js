const { verifyToken } = require('../utils/jwtHelper'); // Update with the correct path

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decodedToken = verifyToken(token);

  req.user = decodedToken;
  next();
};

module.exports = authenticateToken;
