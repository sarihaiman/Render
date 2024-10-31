import { Response, Request } from 'express';
import PhotographyPackage_Model from '../Models/PhotographyPackage.Model';
import OrderPackage_Model from '../Models/OrderPackage.Model';
import date from 'date-and-time';

const datePattern = date.compile('YYYY/MM/DD')
const hourPattern = date.compile('hh:mm')

export const getallOrderPackage = async function (req: Request, res: Response) {
    const PhotographyPackage = await OrderPackage_Model.find();
    res.send(PhotographyPackage)
}

export const addOrderPackage = async function (req: Request, res: Response) {
    try {
        const OrderPackage = JSON.parse(JSON.stringify(req.body));
        const countOrderPackage = await OrderPackage_Model.find();
        const newOrderPackage = {
            "id": Number(OrderPackage.id),
            "userid": Number(OrderPackage.userid),
            "date": Array(OrderPackage.date),
            "beginingHour": Array(OrderPackage.beginingHour),
            "endHour": Array(OrderPackage.endHour),
            "packageId": Number(OrderPackage.packageId),
        }
        await isCorrect(newOrderPackage)
        try {
            await isAvailableTime(newOrderPackage);
        } catch (err) {
            res.status(400).send("" + err);
            return;
        }
        const length = countOrderPackage.length
        if (length === 0)
            newOrderPackage.id = 0;
        else {
            const lengthNow = Number(countOrderPackage[length - 1].id) + 1
            newOrderPackage.id = lengthNow
        }
        await OrderPackage_Model.insertMany(newOrderPackage);
        res.send("Post " + OrderPackage.id + " secceeded")
    } catch (err) {
        res.status(409).send("" + err);
    }
}

export const updateOrderPackage = async function (req: Request, res: Response) {
    try {
        const id = Number(req.params.Id);
        const data = req.body;
        const newOrderPackage = {
            "id": Number(id),
            "userid": Number(data.userid),
            "date": Array(data.date),
            "beginingHour": Array(data.beginingHour),
            "endHour": Array(data.endHour),
            "packageId": Number(data.packageId)
        }
        await isCorrect(newOrderPackage)
        try {
            await isAvailableTime(newOrderPackage);
        } catch (err) {
            res.status(400).send("" + err);
            return;
        }
        await OrderPackage_Model.updateOne({
            id: id
        }, {
            $set: {
                userid: data.userid,
                date: data.date,
                beginingHour: data.beginingHour,
                endHour: data.endHour,
                packageId: data.packageId
            }
        })
        res.send("Update " + id + " secceeded")
    }
    catch (err) {
        res.status(409).send('' + err);
    }
}

export const deleteOrderPackage = async (req: Request, res: Response) => {
    try {
        const id = req.params.Id;
        if (await OrderPackage_Model.findOne({ "id": id }) === null) {
            res.status(404).send('OrderPackage not found');
            return
        }
        await OrderPackage_Model.deleteOne({ id: id })
    } catch (err) {
        res.status(409).send('error!!!');
    }
    res.send("Delete: " + req.params.Id + " secceeded");
}

const isCorrect = async (newOrderPackage: any) => {
    if (await PhotographyPackage_Model.findOne({ "id": newOrderPackage.packageId }) === null) {
        throw new Error("error packageId")
    }
    if (!(date.isValid(newOrderPackage.beginingHour, hourPattern))) {
        throw new Error("error beginingHour")
    }
    if (!date.isValid(newOrderPackage.endHour, hourPattern)) {
        throw new Error("error endHour")
    }
    if (!(date.isValid(newOrderPackage.date, datePattern))) {
        throw new Error("error date")
    }
    if (!(newOrderPackage.endHour > newOrderPackage.beginingHour)) {
        throw new Error("error Hours")
    }
    if (newOrderPackage.date < date.format(new Date(), datePattern)) {
        throw new Error("error - date pass")
    }
}

const isAvailableTime = async (newOrderPackage: any) => {
    const equalsdate2 = await OrderPackage_Model.find({ "date": newOrderPackage.date })
    console.log(equalsdate2);
    
    const equalsdate = await OrderPackage_Model.find({
        $and: [
            { "date": newOrderPackage.date },
            { "id": { $ne: newOrderPackage.id } }
        ]
    });
    console.log(equalsdate);  
    equalsdate.sort(function (a: any, b: any) { return a.beginingHour < b.beginingHour ? -1 : 1 });
    equalsdate.forEach((e: any) => {
        if (e['endHour'] > newOrderPackage.beginingHour) {
            if (!(e['beginingHour'] > newOrderPackage.endHour)) {
                throw new Error("the hours is not available")
            }
        }
    })
}
