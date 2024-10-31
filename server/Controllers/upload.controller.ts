import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { uploadFile , getUploadFile , getUploadFileOne} from '../Services/upload.service';
import express from 'express';
import logger from '../logger'; // Import the logger

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


export const post = async (req: Request, res: Response) => {
    logger.info(`POST request received at ${req.path}`);
    await uploadFile(req, res);
};

export const get = async (req: Request, res: Response) => {
    logger.info(`GET request received at ${req.path}`);
    await getUploadFile(req, res);
};

export const getOne = async (req: Request, res: Response) => {
    logger.info(`GET request received at ${req.path}`);
    await getUploadFileOne(req, res);
};

