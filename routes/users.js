const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const validator = require('validator');
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

router.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(method, 'custom validator'),
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
  }),
}), createUser);
router.get('/users/:id', auth, readUser);
router.get('/users', auth, readUsers);

module.exports = router;
