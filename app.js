const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const auth = require('./middleware/auth');
const error = require('./middleware/error');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

mongoose
  .connect(DB_URL)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Страница не найдена' });
  next();
});

app.use(error);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
