const { celebrate, Joi, Segments } = require('celebrate');

const authValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
});

const userIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

const updateUserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
/* const userValidations = {
  authValidator: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  },
  userByIdValidator: {

    Joi.object().keys({
      userIdId: Joi.string().alphanum().length(24),
    }),
  },
  updateUser: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
  updateAvatar: {
    avatar: Joi.string().required().uri(),
  },
}; */

module.exports = { authValidator, userIdValidator, updateUserValidator };
