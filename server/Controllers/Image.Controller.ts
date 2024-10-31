import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { postimages , getimages, getByIdimages , deleteimages} from '../Services/Image.servise';
import express from 'express';
import logger from '../logger';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export const post = async (req: any, res: Response) => {
    logger.info(`POST request received at ${req.path}`);
    await postimages(req, res);
};

export const get = async (req: any, res: Response) => {
    logger.info(`GET request received at ${req.path}`);
    await getimages(req, res);
};

export const getById = async (req: any, res: Response) => {
    logger.info(`GETById request received at ${req.path}`);
    await getByIdimages(req, res);
};

export const deleteimage = async (req: any, res: Response) => {
    logger.info(`DELETE request received at ${req.path}`);
    await deleteimages(req, res);
};