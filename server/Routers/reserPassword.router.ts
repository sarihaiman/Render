import express from 'express';
import { getUploadFile } from '../Services/resetPassword.service';
const router = express.Router();

router.get('/send-email', getUploadFile); 

export default router;