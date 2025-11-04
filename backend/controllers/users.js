const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { JWT_SECRET = "dev-secret" } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "ID inválido";
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name, about, avatar } = req.body;
  if (!email || !password) {
    const err = new Error("Email e senha são obrigatórios.");
    err.statusCode = 400;
    return next(err);
  }
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name: name || "Jacques Cousteau",
        about: about || "Explorer",
        avatar:
          avatar ||
          "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
      })
    )
    .then((user) =>
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        err.statusCode = 409;
        err.message = "Email já cadastrado.";
      } else if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Dados inválidos ao criar usuário.";
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("Email e senha são obrigatórios.");
    err.statusCode = 400;
    return next(err);
  }

  User.findOne({ email })
    .select("+password") // necessário pois o campo password tem select: false
    .then((user) => {
      if (!user) {
        const err = new Error("Credenciais inválidas.");
        err.statusCode = 401;
        throw err;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const err = new Error("Credenciais inválidas.");
          err.statusCode = 401;
          throw err;
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });
        res.send({ token });
      });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        err.statusCode = 400;
        err.message = "Dados inválidos.";
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        err.statusCode = 400;
        err.message = "Dados inválidos.";
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const err = new Error("Usuário não encontrado");
        err.statusCode = 404;
        throw err;
      }
      res.send(user);
    })
    .catch(next);
};
