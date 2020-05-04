const express = require('express');
const routes = express.Router();

const chatController = require('./controllers/ChatController');
const productController = require('./controllers/ProductController');
const botController = require('./controllers/BotController');
const sellerController = require('./controllers/SellerController');


// CONEXÃO COM O BANCO DE DADOS
let db = null;
var MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/mydb";
MongoClient.connect(MONGO_URL, function(err, client) {
    if (err) throw err;
    db = client.db('mydb');
    db.collection('chat').createIndex({created_at:1},{expireAfterSeconds:600});
    console.log("Database created!");
  });


// Rotas para o chat
routes.get('/chat', chatController.teste);
routes.get('/chat/:id', (request, response) => chatController.listChatForId(request, response, db));
routes.post('/chat', (request, response) => chatController.createChat(request, response, db));
routes.post('/chat/:id', (request, response) => chatController.saveMessage(request, response, db));


// Rotas para o mock dos produtos
routes.get('/products', (request, response) => productController.listProducts(request, response, db));
routes.get('/product/:id', (request, response) => productController.getProduct(request, response, db));
routes.post('/product', (request, response) => productController.insertProduct(request, response, db));

// Rotas para a resposta do bot
routes.get('/bot/answer', botController.getAnswerForQuestion);

// Rota para responder o cliente após o vendedor ter respondido uma pergunta que antes era desconhecida
routes.post('/seller/newquestion', (request, response) => sellerController.sendNewQuestionToSeller(request, response,db));
routes.post('/seller/newanswer', (request, response) => sellerController.sendNewAnswerToClient(request, response,db));

module.exports = routes;

