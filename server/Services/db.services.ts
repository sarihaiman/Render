import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import dotenv from 'dotenv';
dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL
const mongoDB = DATABASE_URL;

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB || '');
}

export default mongoose