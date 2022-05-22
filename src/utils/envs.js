import { config } from "dotenv";
config();

export const MONGO_CONNECTION_PRD = process.env.MONGO_CONNECTION_PRD;
export const MONGO_CONNECTION_DEV = process.env.MONGO_CONNECTION_DEV;
export const NODE_ENV = process.env.NODE_ENV;
