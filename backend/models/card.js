const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const urlRegex = /^https?:\/\/(www\.)?[\w\-._~:/?%#[\]@!$&'()*+,;=]+#?$/i;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "URL inválida para imagem do card",
    },
  },
  owner: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
