import mongoose from "mongoose";
import { config } from "../config/settings.js";

export const databaseConnect = () => {
  mongoose.connect(config.dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
