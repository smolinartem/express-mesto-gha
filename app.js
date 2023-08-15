const PORT = 3000;
const express = require('express');
const mongoose = require('mongoose');

/* const { auth } = require('./middleware/auth'); */
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

const app = express();

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
