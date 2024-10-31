import { Response, Request } from 'express';
import feedback_Model from '../Models/feedback.Model';
import date from 'date-and-time';

const datePattern = date.compile('YYYY/MM/DD')
const hourPattern = date.compile('hh:mm')

export const getallfeedback = async function (req: Request, res: Response) {
    const feedback = await feedback_Model.find();
    res.send(feedback)
}

export const addfeedback = async function (req: Request, res: Response) {
    try {
        const feedback = JSON.parse(JSON.stringify(req.body));
        const countfeedback = await feedback_Model.find();
        const newfeedback = {
            "id": Number(feedback.id),
            "name": feedback.name
        }
        const length = countfeedback.length
        if (length === 0)
            newfeedback.id = 0;
        else {
            const lengthNow = Number(countfeedback[length - 1].id) + 1
            newfeedback.id = lengthNow
        }
        await feedback_Model.insertMany(newfeedback);
        res.send("Post " + feedback.id + " secceeded")
    } catch (err) {
        res.status(409).send("" + err);
    }
}
    