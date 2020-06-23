const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error'); // 404

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
module.exports = router;
