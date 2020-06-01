const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    const key = JSON.parse(data).find((element) => element._id === req.params.id);
    if (key) {
      res.send(key);
    } else {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
  });
});
router.get('/users', (req, res) => {
  fs.readFile('data/users.json', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(data);
  });
});

module.exports = router;
