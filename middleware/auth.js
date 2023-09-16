const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  jwt.verify(token, 'key', (err, decoded) => {
    if (err) throw new UnauthorizedError('Необходима авторизация');
    req.user = decoded;
  });

  return next();
};
