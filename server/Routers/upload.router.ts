import express from 'express';
import { post , get , getOne} from '../Controllers/upload.controller';

const router = express.Router();
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), post); 
router.get('/upload', get); 
router.get('/uploadOne/:fileName', getOne); 

export default router;