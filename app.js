const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');

/* const { auth } = require('./middleware/auth'); */
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect(DB_URL)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

const app = express();

app.use(helmet());
app.use(express.json());
/* app.use(auth); */

app.use((req, res, next) => {
  req.user = {
    _id: '64da107d3ebb24fe1d2fee97',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
