const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');
const {
  readUser, readUsers, createUser, login,
} = require('../controllers/users');
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

router.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }).unknown(true),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(method, 'custom method'),
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }),
}), createUser);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).custom(mongoValidator, 'custom mongo validator'),
  }),
}), auth, readUser);
router.get('/users', auth, readUsers);

module.exports = router;
