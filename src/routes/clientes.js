import { Router } from "express";
import { Cliente } from "../model/cliente.js";

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
  const cliente = new Cliente(req.body);
  cliente
    .save()
    .then((result) => {
      res.status(201).send({ output: "Cadastrado", payload: result });
    })
    .catch((erro) => {
      res.status(500).send({ output: `Erro ao cadastrar -> ${erro}` });
    });
});

clientesRoute.put("/:id", (req, res) => {
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

clientesRoute.use((req, res) => {
  res.type("application/json");
  res.status(404).send("404 - Not Found");
});

export { clientesRoute };
