const Users = require('../models/user');

const createNewUser = (req, res) => {
  const { name, about, avatar } = req.body;

  Users.create({ name, about, avatar })
    .then((newUser) => res.status(201).send({ data: newUser }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getAllUsers = (req, res) => {
  Users.find({})
    .then((usersData) => res.status(200).send({ data: usersData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
};
