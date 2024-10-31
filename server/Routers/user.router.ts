import express from 'express';
import { get, post_signin, post_signup, put, deleteOne , putForgetPassword } from '../Controllers/user.controller';
import aouthentication_admin from '../Middleware/aouthentication_admin.middleware';
const router = express.Router();


/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:     
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *             required:
 *               - name
 *               - password
 *               - phone
 *               - email
 *               - isAdmin
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.post('/signup', post_signup)

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: signin user
 *     tags: [User]
 *     requestBody:     
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - phone
 *               - email
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.post('/signin', post_signin)

/**
 * @swagger
 * /User:
 *   get:
 *     summary: Get all Users
 *     tags: [User]
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.get('/user',aouthentication_admin, get)

/**
 * @swagger
 * /User/{id}:
 *   put:
 *     summary: Update an User by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the User to be updated
 *         schema:
 *           type: string
 *     requestBody:     
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *             required:
 *               - name
 *               - password
 *               - phone
 *               - email
 *               - isAdmin
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: OrderPackage not found
 */
router.put('/user/:id',aouthentication_admin, put)

/**
 * @swagger
 * /User/{id}:
 *   delete:
 *     summary: Delete an User by ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the User to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: User not found
 */
router.delete('/user/:id',aouthentication_admin, deleteOne)

router.put('/user/forgetPassword/:id', putForgetPassword)

export default router