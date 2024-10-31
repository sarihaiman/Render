import mongoose from '../Services/db.services';
import { Schema } from "mongoose";

const userModel_schema = new Schema({
    id: { type: Number },
    name: { type: String },
    password: { type: String },
    phone: { type: String },
    email: { type: String },
    isAdmin: { type: Boolean },
});

export default mongoose.model("user_Model", userModel_schema);