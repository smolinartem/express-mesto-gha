const router = require('express').Router();
const {
  getAllCards, createNewCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/', createNewCard);
router.get('/', getAllCards);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
