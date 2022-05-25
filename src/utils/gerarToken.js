import jwt from "jsonwebtoken";
import { config } from "../config/settings.js";

export const gerarToken = (id, usuario, email) => {
  return jwt.sign({ id, usuario, email }, config.jwtSecret, {
    expiresIn: config.jwtExpires,
  });
};
