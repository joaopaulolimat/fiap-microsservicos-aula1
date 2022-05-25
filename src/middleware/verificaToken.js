import jwt from "jsonwebtoken";
import { config } from "../config/settings.js";

export const verificaToken = (req, res) => {
  const tokenEnviado = req.headers.token;

  if (!tokenEnviado) {
    return res.status(401).send({
      retorno: "Não existe token. Realize o processo de autenticação.",
    });
  }

  jwt.verify(tokenEnviado, config.jwtSecret, (erro, { id, usuario, email }) => {
    if (erro)
      return res.status(500).send({ retorno: `Erro interno -> ${erro}` });
    req.content = {
      id,
      usuario,
      email,
    };
  });
};
