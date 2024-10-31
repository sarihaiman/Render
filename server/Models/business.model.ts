import mongoose from '../Services/db.services';
import { Schema } from "mongoose";

const businessModel_schema = new Schema({
    name: { type: String },
    adress: { type: String },
    phone: { type: String },
});

export default mongoose.model("business_Model", businessModel_schema);