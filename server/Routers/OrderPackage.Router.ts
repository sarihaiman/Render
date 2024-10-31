import express from 'express';
import {get,post,put,deleteOne}  from '../Controllers/OrderPackage.Controller';
const router = express.Router();
import aouthentication_user from '../Middleware/aouthentication_user.Middleware';
import aouthentication_admin from '../Middleware/aouthentication_admin.middleware';

/**
 * @swagger
 * /OrderPackage:
 *   get:
 *     summary: Get all OrderPackage
 *     tags: [OrderPackage]
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.get('/OrderPackage', aouthentication_user,get)

/**
 * @swagger
 * /OrderPackage:
 *   post:
 *     summary: Create a new OrderPackage
 *     tags: [OrderPackage]
 *     requestBody:     
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               userid:
 *                 type: integer
 *               date:
 *                 type: string
 *               beginingHour:
 *                 type: string
 *               endHour:
 *                 type: string
 *               packageId:
 *                 type: integer
 *             required:
 *               - name
 *               - description
 *               - beginingHour
 *               - endHour
 *               - packageId
 *               - userid
 *     description: An example endpoint that returns example data
 *     responses:
 *       200:
 *         description: successful operation
 */
router.post('/OrderPackage',aouthentication_user, post)

/**
 * @swagger
 * /OrderPackage/{id}:
 *   put:
 *     summary: Update an OrderPackage by ID
 *     tags: [OrderPackage]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the OrderPackage to be updated
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
 *               userid:
 *                 type: integer
 *               date:
 *                 type: string
 *               beginingHour:
 *                 type: string
 *               endHour:
 *                 type: string
 *               packageId:
 *                 type: integer
 *             required:
 *               - name
 *               - description
 *               - beginingHour
 *               - endHour
 *               - packageId
 *               - userid
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: OrderPackage not found
 */
router.put('/OrderPackage/:Id',aouthentication_admin, put)

/**
 * @swagger
 * /OrderPackage/{id}:
 *   delete:
 *     summary: Delete an OrderPackage by ID
 *     tags: [OrderPackage]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the OrderPackage to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: successful operation
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: OrderPackage not found
 */
router.delete('/OrderPackage/:Id',aouthentication_admin, deleteOne)


export default router;