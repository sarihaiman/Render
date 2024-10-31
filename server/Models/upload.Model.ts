import mongoose from 'mongoose';

const filesSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  image: Buffer,
});

export default mongoose.model("File", filesSchema);