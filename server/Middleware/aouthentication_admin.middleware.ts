import { Response, Request } from 'express';
import dotenv from 'dotenv';
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY
import jwt from 'jsonwebtoken';

const aouthentication_admin = ((req: Request, res: Response, next: () => any) => {

  let token = req.body.token || req.query.token || req.headers.token;
  token = token.slice(7);
  if (!token) {
    return res.status(403).send('A token is required for authen');
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY!);
    if(!(JSON.parse(JSON.stringify(decoded)).isAdmin))
        return res.status(401).send('Invalid admin Token')
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
})

export default aouthentication_admin
