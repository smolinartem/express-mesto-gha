const { Error } = require('mongoose');
const Users = require('../models/user');

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  Users.create({ name, about, avatar })
    .then((newUser) => res.status(201).send({ newUser }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};

const getAllUsers = (req, res) => {
  Users.find({})
    .then((usersData) => res.status(200).send({ usersData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  Users.findById(req.params.userId)
    .orFail(new Error('NotFound'))
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err instanceof Error.CastError) {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  Users.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => {
      if (!name || !about) {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err instanceof Error.ValidatorError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err instanceof Error.CastError) {
        return res.status(400).send({ message: 'Передан некорректный id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  Users.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => {
      if (!avatar) {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err instanceof Error.ValidatorError) {
        return res.status(400).send({ message: err.message });
      }
      if (err instanceof Error.CastError) {
        return res.status(400).send({ message: 'Передан некорректный id' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateAvatar,
};
