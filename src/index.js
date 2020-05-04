const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);   

const PORT = process.env.PORT || 3333;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);