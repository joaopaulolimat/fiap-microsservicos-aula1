import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { databaseConnect } from "./data/conexao.js";
import { clientesRoute } from "./routes/clientes.js";
import { notFound } from "./middleware/notFound.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));

app.use(cors());

databaseConnect();
app.use("/clientes", clientesRoute);
app.use(notFound);

app.listen(3001, () => console.log("Server on-line. Listen on port 3001"));
