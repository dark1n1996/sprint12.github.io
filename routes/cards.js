const router = require('express').Router();
const { deleteCard, readCards, createCard } = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', auth, readCards);
router.post('/cards', auth, createCard);
router.delete('/cards/:id', auth, deleteCard);
module.exports = router;
