const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex = /^https?:\/\/(www\.)?[\w\-._~:/?%#[\]@!$&'()*+,;=]+#?$/i;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Jacques Cousteau",
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: "Explorer",
    },
    avatar: {
      type: String,
      default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
      validate: {
        validator: (v) => urlRegex.test(v),
        message: "URL inválida",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Email inválido",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
