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
        res.send({ message: 'Такого пользователя не существует' });
      }
      return res.status(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  readUser,
  readUsers,
  createUser,
};
