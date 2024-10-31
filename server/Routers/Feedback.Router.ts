import express from 'express';
import {get,post}  from '../Controllers/feedback.Controller';
const router = express.Router();

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get all feedback
 *     tags: [feedback]
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.get('/feedback',get)

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create a new feedback
 *     tags: [feedback]
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
 *             required:
 *               - name
 *               - id
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.post('/feedback', post)

export default router;