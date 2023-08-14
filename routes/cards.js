const router = require('express').Router();
const { getAllCards, createNewCard, deleteCard } = require('../controllers/cards');

router.get('/', getAllCards);
router.post('/', createNewCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
