const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');
const { deleteCard, readCards, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

const method = (v, h) => {
  if (!validator.isURL(v)) {
    return h.error('any.invalid');
  }
  return v;
};

const mongoValidator = (v, h) => {
  if (!mongoose.Types.ObjectId.isValid(v)) {
    return h.error('any.invalid');
  }
  return v;
};

router.get('/cards', auth, readCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(method, 'custom method'),
  }),
}), auth, createCard);
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).custom(mongoValidator, 'custom mongo validator'),
  }),
}), auth, deleteCard);
module.exports = router;
