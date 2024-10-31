import express from 'express';
import multer from 'multer';
import { post, get, getById, deleteimage } from '../Controllers/Image.Controller';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post('/image', upload.single('file'), post);
router.get('/image', get);
router.get('/image/:id', getById);
router.delete('/image/:id', deleteimage);

export default router;
