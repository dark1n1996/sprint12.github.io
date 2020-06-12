const express = require('express');
require('dotenv').config();

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
app.use(users);
app.use(cards);
app.use(error);
app.listen(PORT);
