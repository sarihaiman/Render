import { Response, Request } from 'express';
import dotenv from 'dotenv';
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY
import jwt from 'jsonwebtoken';

const aouthentication_user = ((req: Request, res: Response, next: () => any) => {
  let token = req.body.token || req.query.token || req.headers.token;
  token = token.slice(7);
  if (!token) {
    return res.status(403).send('A token is required for authen');
  }
  try {
    jwt.verify(token, SECRET_KEY!);
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
})

export default aouthentication_user
