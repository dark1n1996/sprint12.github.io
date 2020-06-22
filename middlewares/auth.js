const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/unautorized-error'); // 401
const ConflictError = require('../errors/conflict-error'); // 409
const NotFoundError = require('../errors/not-found-error'); // 404
const BadRequestError = require('../errors/bad-request-error'); // 400
const ForbiddenError = require('../errors/forbidden-error'); // 403

module.exports = (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    return new UnautorizedError('Необходима авторизация');
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
  } catch (err) {
    return new UnautorizedError('Необходима авторизация');
  }
  req.user = payload;
  return next();
};
