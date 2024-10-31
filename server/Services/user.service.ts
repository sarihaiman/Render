import { Response, Request } from 'express';
import user_Model from '../Models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

export const getallUsers = async (req: Request, res: Response) => {
    const users = await user_Model.find();
    res.send(users)
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            res.status(403).send('missing details')
        }
        const user = await user_Model.findOne({ email })
        if (user && (await bcrypt.compare(password, user.password!))) {
            const token = "Bearer " + jwt.sign({ email, isAdmin: user.isAdmin , phone:user.phone , name: user.name , id: user.id },
                SECRET_KEY!, {
                expiresIn: '2h'
            }
            )
            res.status(200).json(token)
        } else {
            if(!user){
                res.status(409).send("email not found");
            }
            else{
                console.log(password);
                
                res.status(409).send("incorrect password");
            }
        }
    } catch (err) {
        console.log(err)
    }
}

export const signup = async (req: Request, res: Response) => {
    try {
        const hasPassword = await bcrypt.hash(req.body.password, 10)
        const data = req.body;
        const usertocheck = await user_Model.findOne({ email: data.email })
        if (usertocheck) {
            res.status(409).send("email exists")
            return
        }
        const user = {
            id: data.id,
            name: data.name,
            password: hasPassword,
            phone: data.phone,
            email: data.email,
            isAdmin: data.isAdmin,
        }
        user_Model.insertMany(user)
        res.send("sign up " + user.id + " secceeded")
    } catch (err) {
        res.status(409).send(err);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (await user_Model.findOne({ "id": id }) === null) {
            res.status(404).send('user not found');
            return
        }
        const usertocheck = await user_Model.findOne({ email: data.email })
        if (usertocheck && usertocheck.id!=id) {
            res.status(409).send("email exists")
            return
        }
        await user_Model.updateOne({
            id: id
        }, {
            $set: {
                name: data.name,
                password: data.password,
                phone: data.phone,
                email: data.email,
            }
        })
        res.send("Update " + id + " secceeded")
    } catch (err) {
        res.status(409).send('error!!!');
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (await user_Model.findOne({ "id": id }) === null) {
            res.status(404).send('user not found');
            return
        }
        await user_Model.deleteOne({ id: id })
    } catch (err) {
        res.status(409).send('error!!!');
    }
    res.send("Delete: " + req.params.id + " secceeded");
}

export const updateUserForgetPassword = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const hasPassword = await bcrypt.hash(data.password, 10)
        if (await user_Model.findOne({ "id": id }) === null) {
            res.status(404).send('user not found');
            return
        }
        await user_Model.updateOne({
            email: data.email
        }, {
            $set: {
                password: hasPassword,
            }
        })
        res.send("Update " + id + " secceeded")
    } catch (err) {
        res.status(409).send('error!!!');
    }
}