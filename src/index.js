const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const dbConnection = require('./database/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);   

const dbName = "mydb";
const collectionName = "chat";
dbConnection.initialize(dbName, collectionName, function(dbInstance) { // successCallback
  console.log("Instância do mongo definida em Rotas com sucesso!");
}, function(err) { // failureCallback
  throw (err);
});

const PORT = process.env.PORT || 3333;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);