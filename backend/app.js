const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");
const { errors } = require("celebrate");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const {
  validateUserSignup,
  validateUserLogin,
} = require("./middleware/validation");
const { requestLogger, errorLogger } = require("./middleware/logger");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web Project Around Express API",
      version: "1.0.0",
      description: "API RESTful para gerenciamento de usuários e cards",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect("mongodb://localhost:27017/aroundb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch((err) => console.error("Erro ao conectar no MongoDB:", err));

const { PORT = 3001 } = process.env;

app.use(express.json());

app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

app.post("/signup", validateUserSignup, createUser);
app.post("/signin", validateUserLogin, login);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
