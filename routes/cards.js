const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { deleteCard, readCards, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', auth, readCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), auth, createCard);
router.delete('/cards/:id', auth, deleteCard);
module.exports = router;
