import { Response, Request } from 'express';
import PhotographyPackage_Model from '../Models/PhotographyPackage.Model';

export const getallPhotographyPackage = async (req: Request, res: Response) =>{
    const PhotographyPackage = await PhotographyPackage_Model.find();
    res.send(PhotographyPackage)
}

export const addPhotographyPackage = async (req: Request, res: Response) =>{
    try {
        const PhotographyPackage = JSON.parse(JSON.stringify(req.body));
        const countPhotographyPackage = await PhotographyPackage_Model.find();
        const newPhotographyPackage = {
            "id": Number(PhotographyPackage.id),
            "type": PhotographyPackage.type,
            "moneyToHour": PhotographyPackage.moneyToHour,
        }
        const length = countPhotographyPackage.length
        if (length === 0)
            newPhotographyPackage.id = 0;
        else {
            const lengthNow = Number(countPhotographyPackage[length - 1].id) + 1
            newPhotographyPackage.id = lengthNow
        }
        await PhotographyPackage_Model.insertMany(newPhotographyPackage);
        res.send(newPhotographyPackage)
    } catch (err) {
        res.status(409).send(err);
    }
}

export const updatePhotographyPackage = async (req: Request, res: Response) =>{
    try {
        const id = req.params.Id;
        const data = req.body;
        if (await PhotographyPackage_Model.findOne({ "id": id }) === null) {
            res.status(404).send('PhotographyPackage not found');
            return
        }
        await PhotographyPackage_Model.updateOne({
            id: id
        }, {
            $set: {
                type: data.type,
                moneyToHour: Number(data.moneyToHour)
            }
        })
        res.send("Update " + id + " secceeded")
    } catch (err) {
        res.status(409).send('error!!!');
    }
}

export const deletePhotographyPackage = async (req: Request, res: Response) => {
    try {
        const id = req.params.Id;
        if (await PhotographyPackage_Model.findOne({ "id": id }) === null) {
            res.status(404).send('PhotographyPackage not found');
            return
        }
        await PhotographyPackage_Model.deleteOne({ id: id })
    } catch (err) {
        res.status(409).send('error!!!');
    }
    res.send("Delete: " + req.params.Id + " secceeded");
}
