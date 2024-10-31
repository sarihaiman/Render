import { Response, Request } from 'express';
import business_Model from '../Models/business.model';

export const getBusinessDetails = async function (req: Request, res: Response) {
    const businessDetails = await business_Model.find();
    res.send(businessDetails)
}

export const updateBusinessDetails = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        console.log(data);
        console.log(business_Model);
        await business_Model.updateOne({
            
        }, {
            $set: {
                name: data.name,
                adress: data.adress,
                phone: data.phone,
            }
        })
        res.send("Update business details secceeded")
    }
    catch (err) {
        res.status(409).send('' + err);
    }
}

