const express = require("express");

const app = express();
const path = require("path");

// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const users = require("./routes/users");
const cards = require("./routes/cards");
const error = require("./routes/error");

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "public")));
app.use(users);
app.use(cards);
app.use(error);
app.listen(PORT, () => {
  console.log(`Работает ${PORT} порт`);
});
