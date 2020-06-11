const router = require('express').Router();
const { readUser, readUsers, createUser } = require('../controllers/users');

router.get('/users/:id', readUser);
router.get('/users', readUsers);
router.post('/users', createUser);

module.exports = router;
