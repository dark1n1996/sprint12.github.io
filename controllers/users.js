const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const UnautorizedError = require('../errors/unautorized-error'); // 401
const ConflictError = require('../errors/conflict-error'); // 409
const NotFoundError = require('../errors/not-found-error'); // 404
const BadRequestError = require('../errors/bad-request-error'); // 400

const readUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};
const readUser = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    return User.findById(req.params.id)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('Такого пользователя не существует');
        }
        return res.status(200).send({ data: user });
      })
      .catch(next);
  }
  return next(new BadRequestError('Запрос не прошел валидацию'));
};
const createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, password, email,
      })
        .then((user) => {
          User.findByIdAndUpdate(user._id, { password: `${hash}` }, { new: true })
            // eslint-disable-next-line no-shadow
            .then((user) => res.status(200).send({ data: user }))
            .catch(next);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Запрос не прошел валидацию'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с такой электронной почтой уже существует'));
          }
          return next(err);
        });
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { password, email } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnautorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            throw new UnautorizedError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          res.cookie('jwt', token, { httpOnly: true }).end();
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  readUser,
  readUsers,
  createUser,
  login,
};
