const Card = require('../models/card');
const UnautorizedError = require('../errors/unautorized-error'); // 401
const ConflictError = require('../errors/conflict-error'); // 409
const NotFoundError = require('../errors/not-found-error'); // 404
const BadRequestError = require('../errors/bad-request-error'); // 400
const ForbiddenError = require('../errors/forbidden-error'); // 403

const readCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user.id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Запрос не прошел валидацию'));
      }
      return next(err);
    });
};
const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        if (req.user.id == card.owner) {
          Card.findByIdAndRemove(req.params.id)
            .then(() => {
              res.status(200).send({ data: card });
            });
        } else {
          throw new ForbiddenError('Недостаточно прав для удаления карточки');
        }
      } else {
        throw new NotFoundError('Такой карточки нет');
      }
    })
    .catch(next);
};
module.exports = {
  deleteCard,
  readCards,
  createCard,
};
