const express = require('express');
const chatController = require('./controllers/ChatController');
const productController = require('./controllers/ProductController');
const botController = require('./controllers/BotController');

const routes = express.Router();

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