const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const config = require('./config');

const auth = require('./middleware/auth');
const error = require('./middleware/error');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const NotFoundError = require('./errors/notFoundError');

const { authValidator } = require('./validations/validations');

mongoose
  .connect(config.DB_URL)
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.post('/signup', authValidator, createUser);
app.post('/signin', authValidator, login);
app.use(auth);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errors());
app.use(error);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
