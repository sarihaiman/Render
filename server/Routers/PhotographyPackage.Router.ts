import express from 'express';
import {get,post,put,deleteOne} from '../Controllers/PhotographyPackage.Controller';
import aouthentication_admin from '../Middleware/aouthentication_admin.middleware';
const router = express.Router();

/**
 * @swagger
 * /PhotographyPackage:
 *   get:
 *     summary: Get all PhotographyPackage
 *     tags: [PhotographyPackage]
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */

router.get('/PhotographyPackage', get)

/**
 * @swagger
 * /PhotographyPackage:
 *   post:
 *     summary: Create a new PhotographyPackage
 *     tags: [PhotographyPackage]
 *     requestBody:     
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               type:
 *                 type: string
 *               moneyToHour:
 *                 type: integer
 *             required:
 *               - id
 *               - type
 *               - moneyToHour
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */

router.post('/PhotographyPackage', aouthentication_admin, post)


/**
 * @swagger
 * /PhotographyPackage/{id}:
 *   put:
 *     summary: Update an PhotographyPackage by ID
 *     tags: [PhotographyPackage]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the PhotographyPackage to be updated
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
 *               type:
 *                 type: string
 *               moneyToHour:
 *                 type: integer
 *             required:
 *               - id
 *               - type
 *               - moneyToHour
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: PhotographyPackage not found
 */

router.put('/PhotographyPackage/:Id', aouthentication_admin, put)



/**
 * @swagger
 * /PhotographyPackage/{id}:
 *   delete:
 *     summary: Delete a PhotographyPackage by ID
 *     tags: [PhotographyPackage]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the PhotographyPackage to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: PhotographyPackage not found
 */

router.delete('/PhotographyPackage/:Id', aouthentication_admin, deleteOne)

export default router;
