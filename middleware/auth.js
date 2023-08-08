const { verifyToken } = require('../utils/jwtHelper'); // Update with the correct path

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return res.sendStatus(403);
  }

  req.user = decodedToken;
  next();
};

module.exports = authenticateToken;
