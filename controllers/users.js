const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const readUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const readUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Такого пользователя не существует' });
      }
      return res.status(200).send({ data: user });
    })
    .catch(() => res.status(404).send({ message: 'Такого пользователя не существует' }));
};
const createUser = (req, res) => {
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
            .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: 'Запрос не прошел валидацию' });
          }
          if (err.code === 11000) {
            return res.status(409).send({ message: 'Пользователь с такой электронной почтой уже существует' });
          }
          return res.status(500).send({ message: 'Произошла ошибка на сервере' });
        });
    });
};
const login = (req, res) => {
  const { password, email } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET}`, { expiresIn: '7d' });
          res.cookie('jwt', token, { httpOnly: true }).end();
        });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  readUser,
  readUsers,
  createUser,
  login,
};
