const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Некорректный URL',
    },
  },
  password: {
    required: true,
  },
  email: {
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Некорректный Email',
    },
  },
  },
});

module.exports = mongoose.model('user', userSchema);
