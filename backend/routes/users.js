const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require("../middleware/validation");

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna informações do usuário atual
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário atual retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6123456789abcdef01234567
 *                 email:
 *                   type: string
 *                   example: usuario@exemplo.com
 *                 name:
 *                   type: string
 *                   example: Jacques Cousteau
 *                 about:
 *                   type: string
 *                   example: Explorer
 *                 avatar:
 *                   type: string
 *                   example: https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro no servidor
 */

router.get("/me", getCurrentUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */

router.get("/", getUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */

router.get("/:userId", validateUserId, getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - about
 *               - avatar
 *             properties:
 *               name:
 *                 type: string
 *               about:
 *                 type: string
 *               avatar:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */

router.patch("/me", validateUpdateProfile, updateProfile);

/**
 * @swagger
 * /users/me/avatar:
 *   patch:
 *     summary: Atualiza o avatar do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avatar atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */

router.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

module.exports = router;
