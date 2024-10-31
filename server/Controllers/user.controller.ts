import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import { getallUsers, signup, signin, updateUser, deleteUser, updateUserForgetPassword } from '../Services/user.service';
import express from 'express';
import logger from '../logger'; // Import the logger

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export const post_signin = async (req: Request, res: Response) => {
    logger.info(`POST request received at ${req.path}`);
    await signin(req, res);
};

export const post_signup = async (req: Request, res: Response) => {
    logger.info(`POST request received at ${req.path}`);
    await signup(req, res);
};

export const get = async (req: Request, res: Response) => {
    logger.info(`GET request received at ${req.path}`);
    await getallUsers(req, res);
};

export const put = async (req: Request, res: Response) => {
    logger.info(`PUT request received at ${req.path}`);
    await updateUser(req, res);
};

export const deleteOne = async (req: Request, res: Response) => {
    logger.info(`DELETE request received at ${req.path}`);
    await deleteUser(req, res);
};

export const putForgetPassword = async (req: Request, res: Response) => {
    logger.info(`PUT request received at ${req.path}`);
    await updateUserForgetPassword(req, res);
};
