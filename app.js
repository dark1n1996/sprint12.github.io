const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(users);
app.use(cards);
app.use(error);
app.listen(PORT);
