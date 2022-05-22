import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const databaseConnect = () => {
  const urldb = process.env.MONGO_CONNECTION;
  mongoose.connect(urldb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
