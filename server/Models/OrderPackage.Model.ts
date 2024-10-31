import mongoose from '../Services/db.services';
import { Schema } from "mongoose";
import date from 'date-and-time';

const datePattern=date.compile('YYYY/MM/DD')
const hourPattern=date.compile('hh:mm')

const OrderPackageModel_schema = new Schema({
    id: { type: Number },
    userid: { type: Number },
    packageId: { type: Number },
    date: { type: datePattern },
    beginingHour: { type: hourPattern },
    endHour: { type: hourPattern },
});

export default mongoose.model("OrderPackage_Model", OrderPackageModel_schema);