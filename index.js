const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

app.get('/', (req, res) => {
    res.status(200).send({output: 'Hello, world!'});
})

app.listen(3001,()=>{});