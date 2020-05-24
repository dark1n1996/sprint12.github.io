const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/error');
app.use(express.static(__dirname + '/public'));
app.use(users);
app.use(cards);
app.use(error);
app.listen(PORT, () => {
  console.log(`Работает ${PORT} порт`)
});