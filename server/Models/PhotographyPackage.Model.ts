import { Schema } from 'mongoose';
import mongoose from '../Services/db.services';

const PhotographyPackage_schema = new Schema({
    id: { type: Number },
    type: { type: String },
    moneyToHour: { type: Number }
});

export default mongoose.model("PhotographyPackage_model", PhotographyPackage_schema);