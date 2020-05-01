const express = require('express');
const routes = express.Router();

const chatController = require('./controllers/ChatController');
const productController = require('./controllers/ProductController');
const botController = require('./controllers/BotController');

// CONEXÃO COM O BANCO DE DADOS
var MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/mydb";
MongoClient.connect(MONGO_URL, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });

// Rotas para o chat
routes.get('/chat', chatController.teste);
routes.get('/chat/:id', chatController.listChatForId);
routes.post('/chat/:id', chatController.saveMessage);

// Rotas para o mock dos produtos
routes.get('/products', productController.listProducts);
routes.get('/product/:id', productController.getProduct);

// Rotas para a resposta do bot
routes.get('/bot/answer', botController.getAnswerForQuestion);

module.exports = routes;