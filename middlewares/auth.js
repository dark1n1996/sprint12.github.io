const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
