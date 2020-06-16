const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  if (!cookie) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = cookie.replace('Cookie_1=value; jwt=', '');
  let payload;
  try {
    payload = jwt.verify(token, `${process.env.JWT_SECRET}`);
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
