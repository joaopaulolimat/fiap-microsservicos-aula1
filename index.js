import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { databaseConnect } from "./src/config/databaseConnection.js";
import { Cliente } from "./src/modules/user/repository/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

databaseConnect();

app.get("/", (req, res) => {
  Cliente.find((erro, result) => {
    if (erro) {
      return res
        .status(500)
        .send({ output: `Erro ao processar o pedido -> ${erro}` });
    }

    res.status(200).send({ output: "Ok", payload: result });
  });
});

app.post("/", (req, res) => {
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

app.put("/:id", (req, res) => {
  res.status(202).send({ id: req.params.id, body: req.body });
});

app.delete("/:id", (req, res) => {
  res.status(202).send({ id: req.params.id, body: req.body });
});

app.use((req, res) => {
  res.type("application/json");
  res.status(404).send("404 - Not Found");
});

app.listen(3001, () => console.log("Server on-line. Listen on port 3001"));
