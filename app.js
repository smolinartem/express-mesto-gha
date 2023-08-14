const PORT = 3000;
const express = require('express');
const mongoose = require('mongoose');

const users = require('./models/user');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.get('/users', (req, res) => {
  users.find({})
    .then((usersData) => res.status(200).send({ data: usersData }))
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  users.create({ name, about, avatar })
    .then((newUser) => res.status(201).send({ data: newUser }))
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.get('/users/:userId', (req, res) => {
  users.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// "_id": "64da107d3ebb24fe1d2fee97"
