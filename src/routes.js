const express = require('express');
const routes = express.Router();

const chatController = require('./controllers/ChatController');
const productController = require('./controllers/ProductController');
const botController = require('./controllers/BotController');
const sellerController = require('./controllers/SellerController');
const mLController = require('./controllers/MLController');
const mlApi = require('./services/MLAPI');

// Rotas para o chat
routes.get('/chat', chatController.teste);
routes.get('/chat/:id', (request, response) =>
  chatController.listChatForId(request, response),
);
routes.post('/chat', (request, response) =>
  chatController.createChat(request, response),
);
routes.post('/chat/:id', (request, response) =>
  chatController.saveMessage(request, response),
);

// Rotas para o mock dos produtos
routes.get('/products', (request, response) =>
  productController.listProducts(request, response),
);
routes.get('/product/:id', (request, response) =>
  productController.getProduct(request, response),
);
routes.post('/product', (request, response) =>
  productController.insertProduct(request, response),
);

// Rotas para a resposta do bot
routes.get('/bot/answer', botController.getAnswerForQuestion);

// Rota para responder o cliente após o vendedor ter respondido uma pergunta que antes era desconhecida
routes.post('/seller/newquestion', (request, response) =>
  sellerController.sendNewQuestionToSeller(request, response),
);
routes.post('/seller/newanswer', (request, response) =>
  sellerController.sendNewAnswerToClient(request, response),
);

// Rota de notificação da API do mercado livre
routes.post('/ml/notifications', (request, response) =>
  mLController.handleMLNotification(request, response),
);

routes.post('/olist/notifications', (request, response) =>
  mlApi.handleNotificationFromOlist(request, response),
);

module.exports = routes;
