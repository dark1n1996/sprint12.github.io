const router = require("express").Router();
const fs = require("fs");

router.get("/cards", (req, res) => {
  fs.readFile("data/cards.json", { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(data);
  });

});
module.exports = router;