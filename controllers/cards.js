const Card = require('../models/card');

const readCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user.id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Запрос не прошел валидацию' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        if (req.user.id == card.owner) {
          Card.findByIdAndRemove(req.params.id)
            .then(() => {
              res.status(200).send({ data: card });
            });
        } else {
          res.status(403).send({ message: 'Недостаточно прав для удаления карточки' });
        }
      } else {
        res.status(404).send({ message: 'Такой карточки нет' });
      }
    })
    .catch(() => res.status(404).send({ message: 'Такой карточки нет' }));
};
module.exports = {
  deleteCard,
  readCards,
  createCard,
};
