const jwt = require('jsonwebtoken');

const secretKey = 'megamillions';

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
