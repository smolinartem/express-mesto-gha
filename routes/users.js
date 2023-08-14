const router = require('express').Router();
const { createNewUser, getAllUsers, getUserById } = require('../controllers/users');

router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);

module.exports = router;
