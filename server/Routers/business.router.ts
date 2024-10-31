import express from 'express';
import { get, put } from '../Controllers/business.controller';
import aouthentication_admin from '../Middleware/aouthentication_admin.middleware';

const router = express.Router();


/**
 * @swagger
 * /business:
 *   get:
 *     summary: Get all business
 *     tags: [business]
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.get('/business', get)


/**
 * @swagger
 * /business:
 *   put:
 *     summary: Update an business
 *     tags: [business]
 *     requestBody:     
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               adress:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - adress
 *               - phone
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: business not found
 */

router.put('/business',aouthentication_admin, put)

export default router;