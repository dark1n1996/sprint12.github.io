const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).catch((err) => { console.log(err); });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5edb9e2821a6b5544189dd65',
  };
  next();
});
app.use(users);
app.use(cards);
app.use(error);
app.listen(PORT);
