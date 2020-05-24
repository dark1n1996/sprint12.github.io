const router = require('express').Router();
router.get('/:meaning', (req, res) => {
  if(req.params.meaning !== 'users' || req.params.meaning !== 'cards') {
    res.status(404);
    res.send('{ "message": "Запрашиваемый ресурс не найден" }');
  }
});
module.exports = router;