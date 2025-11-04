const { celebrate, Joi, Segments } = require("celebrate");
const { validateURL } = require("../utils/validation");

// --- Validações relacionadas a usuários ---

const validateUserSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
  }),
});

const validateUserLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

// Atualizar perfil do usuário (name e about)
const validateUpdateProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// Atualizar avatar do usuário
const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

// --- Validações relacionadas a cards ---

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateUserSignup,
  validateUserLogin,
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateCreateCard,
  validateCardId,
};
