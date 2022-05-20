const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

const urldb =
  "mongodb+srv://joao:123@cluster0.8g10p.mongodb.net/database?retryWrites=true&w=majority";
mongoose.connect(urldb, { useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({
  nome: { type: String, require: true },
  email: { type: String, require: true },
  cpf: { type: String, require: true, unique: true },
  telefone: { type: String, require: true },
  usuario: { type: String, require: true, unique: true },
  senha: { type: String, require: true },
  datacadastro: { type: Date, default: Date.now() },
});

const Cliente = mongoose.model("cliente", schema);

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
