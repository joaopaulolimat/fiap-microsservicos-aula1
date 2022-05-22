import mongoose from "mongoose";

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

export { Cliente };
