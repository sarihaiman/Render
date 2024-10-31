import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { getallPhotographyPackage, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../Services/PhotographyPackage.service';
import express from 'express';
import logger from '../logger'; // Import the logger

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export const get = async (req: Request, res: Response) => {
    logger.info(`GET request received at ${req.path}`);
    await getallPhotographyPackage(req, res);
};

export const post = async (req: Request, res: Response) => {
    logger.info(`POST request received at ${req.path}`);
    await addPhotographyPackage(req, res);
};

export const put = async (req: Request, res: Response) => {
    logger.info(`PUT request received at ${req.path}`);
    await updatePhotographyPackage(req, res);
};

export const deleteOne = async (req: Request, res: Response) => {
    logger.info(`DELETE request received at ${req.path}`);
    await deletePhotographyPackage(req, res);
};
