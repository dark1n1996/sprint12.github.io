const router = require('express').Router();
const { deleteCard, readCards, createCard } = require('../controllers/cards');

router.get('/cards', readCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
module.exports = router;
