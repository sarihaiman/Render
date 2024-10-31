import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { getBusinessDetails, updateBusinessDetails } from '../Services/business.service';
import express from 'express';
import logger from '../logger'; // Import the logger

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


export const get = async (req: Request, res: Response) => {
    logger.info(`GET request received at ${req.path}`);
    await getBusinessDetails(req, res);
};

export const put = async (req: Request, res: Response) => {
    logger.info(`PUT request received at ${req.path}`);
    await updateBusinessDetails(req, res);
};

