const jwt = require("jsonwebtoken");

const { JWT_SECRET = "dev-secret" } = process.env; // usa variável de ambiente ou um segredo padrão

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // pega o cabeçalho de autorização

  // Se não houver cabeçalho ou ele não começar com "Bearer ", retorna erro
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(403)
      .send({ message: "Autorização necessária: token ausente ou malformado" });
  }

  const token = authorization.replace("Bearer ", ""); // remove "Bearer " e pega o token puro
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Token inválido ou expirado" });
  }

  req.user = payload;
  next();
};
