const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/unautorized-error'); // 401

module.exports = (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    return next(new UnautorizedError('Необходима авторизация'));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnautorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
