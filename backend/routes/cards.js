const express = require("express");
const router = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards");

const {
  validateCreateCard,
  validateCardId,
} = require("../middleware/validation");

/**
 * @swagger
 * /cards:
 *   get:
 *     summary: Retorna todos os cards
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Lista de cards
 */

router.get("/", getCards);

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Cria um novo card
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - link
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       201:
 *         description: Card criado com sucesso
 */

router.post("/", validateCreateCard, createCard);

/**
 * @swagger
 * /cards/{cardId}:
 *   delete:
 *     summary: Remove um card pelo ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do card
 *     responses:
 *       200:
 *         description: Card removido com sucesso
 *       404:
 *         description: Card não encontrado
 */

router.delete("/:cardId", validateCardId, deleteCard);

/**
 * @swagger
 * /cards/{cardId}/likes:
 *   put:
 *     summary: Adiciona um like a um card
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do card
 *     responses:
 *       200:
 *         description: Like adicionado com sucesso
 *       404:
 *         description: Card não encontrado
 */

router.put("/:cardId/likes", validateCardId, likeCard);

/**
 * @swagger
 * /cards/{cardId}/likes:
 *   delete:
 *     summary: Remove um like de um card
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: cardId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do card
 *     responses:
 *       200:
 *         description: Like removido com sucesso
 *       404:
 *         description: Card não encontrado
 */

router.delete("/:cardId/likes", validateCardId, unlikeCard);

module.exports = router;
