const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos ao criar card.";
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(() => {
      const err = new Error("Card não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        const err = new Error("Não autorizado a deletar este cartão");
        err.statusCode = 403;
        throw err;
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) =>
      res.send({ message: "Card removido com sucesso", deletedCard })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Card não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }
      next(err);
    });
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Card não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }
      next(err);
    });
};
