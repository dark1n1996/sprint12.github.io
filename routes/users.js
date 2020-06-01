const router = require("express").Router();
const fs = require("fs");
let a = [];
router.get("/users/:id", (req, res) => {
  fs.readFile("data/users.json", { encoding: "utf8" }, (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
    JSON.parse(data).find ( e => {
      if(e._id === req.params.id) {
        res.send(e);
      }
      a.push(e._id);
    });
    if(!a.includes(req.params.id)) {
      res.status(404);
      res.send({ "message": "Нет пользователя с таким id" });
    }
  });
});
router.get("/users", (req, res) => {
  fs.readFile("data/users.json", { encoding: "utf8" }, (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
    res.send(data);
  });

});

module.exports = router;