import { Router } from "express";
import { Cliente } from "../model/cliente.js";
import * as bcrypt from "bcrypt";
import { gerarToken } from "../utils/gerarToken.js";
import { verificaToken } from "../middleware/verificaToken.js";
import { config } from "../config/settings.js";

const clientesRoute = Router();

clientesRoute.get("/", (req, res) => {
  Cliente.find((erro, result) => {
    if (erro) {
      return res
        .status(500)
        .send({ output: `Erro ao processar o pedido -> ${erro}` });
    }

    res.status(200).send({ output: "Ok", payload: result });
  });
});

clientesRoute.post("/", (req, res) => {
  bcrypt.hash(req.body.senha, config.bcryptSalt, (erro, result) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao tentar gerar a senha: ${erro}` });

    req.body.senha = result;
    const cliente = new Cliente(req.body);
    cliente
      .save()
      .then((result) => {
        res.status(201).send({ output: "Cadastrado", payload: result });
      })
      .catch((erro) => {
        res.status(500).send({ output: `Erro ao cadastrar: ${erro}` });
      });
  });
});

clientesRoute.post("/login", (req, res) => {
  Cliente.findOne({ usuario: req.body.usuario }, (erro, result) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Erro ao tentar localizar: ${erro}` });
    if (!result)
      return res.status(400).send({ output: `Usuário não localizado` });

    bcrypt.compare(req.body.senha, result.senha, (erro, same) => {
      if (erro)
        return res
          .status(500)
          .send({ output: `Erro ao validar a senha: ${erro}` });
      if (!same) return res.status(400).send({ output: `Senha inválida` });

      const token = gerarToken(result._id, result.usuario, result.email);
      if (token) return res.status(200).send({ output: "Autenticado", token });
    });
  });
});

clientesRoute.put("/:id", verificaToken, (req, res) => {
  Cliente.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (erro, dados) => {
      if (erro) {
        return res.status(500).send({ output: `Erro ao cadastrar -> ${erro}` });
      }
      if (!dados) {
        return res
          .status(400)
          .send({ output: `Não foi possível atualizar -> ${erro}` });
      }
      return res.status(200).send({ output: "Atualizado", payload: dados });
    }
  );
});

clientesRoute.delete("/:id", (req, res) => {
  Cliente.findByIdAndDelete(req.params.id, (erro, dados) => {
    if (erro)
      return res
        .status(500)
        .send({ output: `Não foi possível apagar -> ${erro}` });
    res.status(204).send({});
  });
});

export { clientesRoute };
