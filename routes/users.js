const router = require('express').Router();
const {
  readUser, readUsers, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);
router.get('/users/:id', auth, readUser);
router.get('/users', auth, readUsers);

module.exports = router;
