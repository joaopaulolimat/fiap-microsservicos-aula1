import { jsonwebtoken as jwt } from "jsonwebtoken";
import { config } from "../config/settings";

export const gerarToken = (id, usuario, email) => {
  return jwt.sign(
    { idusuario: id, nomeusuario: usuario, email },
    config.jwtSecret,
    { expiresIn: config.jwtExpires }
  );
};
