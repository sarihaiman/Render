import mongoose from '../Services/db.services';
import { Schema } from "mongoose";

const feedbackModel_schema = new Schema({
    id: { type: Number },
    name: { type: String },
});

export default mongoose.model("feedback_Model", feedbackModel_schema);