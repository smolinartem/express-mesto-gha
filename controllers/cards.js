const Cards = require('../models/card');

const getAllCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(201).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createNewCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Cards.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
    .then(res.status(200).send({ message: 'Карточка удалена', id: req.params.cardId }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getAllCards,
  createNewCard,
  deleteCard,
};
