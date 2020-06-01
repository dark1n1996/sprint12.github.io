const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/cards', (req, res) => {
  fs.readFile((path.join(__dirname, '../data/cards.json')), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.send(data);
  });
});
module.exports = router;
