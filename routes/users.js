const router = require('express').Router();
const fs = require('fs');
let a = [];
router.get('/users/:id', (req, res) => {
  fs.readFile('data/users.json', { encoding: 'utf8' }, (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
    for(let i = 0; i < JSON.parse(data).length; i++) {
      a.push(JSON.parse(data)[i]._id);
      if(JSON.parse(data)[i]._id === req.params.id) {
        res.send(JSON.parse(data)[i]);
        return;
      } else {
        continue;
      }
    }
    if(!a.includes(req.params.id)) {
      res.status(404);
      res.send({ "message": "Нет пользователя с таким id" });
    }
    console.log(req.params.id);
  });
});
router.get('/users', (req, res) => {
  fs.readFile('data/users.json', { encoding: 'utf8' }, (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(data);
  });

});

module.exports = router;