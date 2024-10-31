import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  image: Buffer,
});

export default mongoose.model("Image", imageSchema);