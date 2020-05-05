<h3 align="center">OliBot</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">🧐 Backend da aplicação OliBot. API REST para gerenciamento de perguntas e conversas em sites de marketplace.
    <br>
</p>

## 📝 Conteúdo

- [Sobre](#about)
- [Inicializando a aplicação](#getting_started)
- [Uso](#usage)
- [Ferramentas](#built_using)
- [Autores](#authors)
- [Considerações finais](#acknowledgement)
---

## 🏁 Inicializando a aplicação <a name = "getting_started"></a>

Inicializar a aplicação pode ser feita via Docker ou baixando as bibliotecas localmente.
Para ter interação com o Mercado Livre, é necessário que a aplicação esteja deployada (indicamos Heroku).

### Pré-requisitos

```
Docker configurado
Credenciais do DialogFlow
Credenciais Mercado Livre (vide configuração para desenvolvimento na plataforma)
Docker local ou em nuvem
```

### Instalação

Inicialmente é necessário configurar a rede docker que manterá os containeres conectados.

```
docker network create bubble
```
Coloque as variáveis no arquivo .env e então rode o composer para baixar as imagens base, criar a imagem da aplicação e banco.

```
docker-compose -f docker-compose.yml up -d --build
```

Verifique que a aplicação está espelhada na porta 3333 e que o banco está espelhado na porta 27017.


## 🎈 Uso <a name="usage"></a>

O uso do chatbot localmente se limita a conversa através de um front-end (à ser integrado). Para uma aplicação em nuvem, todas as funcionalidades estão funcionais.
Para o deploy em nuvem, é necessário que as credenciais do Dialogflow sejam compiladas durante o build, indicamos o buildpack https://github.com/gerywahyunugraha/heroku-google-application-credentials-buildpack .

### Rotas

```
/chat - Lista de chats disponíveis
/chat/:id - Lista mensagens de um chat

/products - Lista de produtos
/product/:id - Detalhes de produto específico

/bot/answer - Pega resposta de uma pergunta isolada

/seller/newquestion - Envia questão não respondida para vendedor
/seller/newanswer - Envia questão respondida pelo vendedor

/ml/notifications - Comunicação de notificação do Mercado Livre

/olist/notifications - Envio de notificação para Olist
```

## ⛏️ Ferramentas <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Express](https://expressjs.com/) - Server Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Eslint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Code Formatter
- [Nodemon](https://nodemon.io/) - Changes Monitor

## ✍️ Autor <a name = "authors"></a>

- [@bih-goncalves](https://github.com/bih-goncalves)
- [@gsbiel](https://github.com/gsbiel)

## 🎉 Considerações finais <a name = "acknowledgement"></a>

- Esse projeto faz parte do Desafio [@olist](https://olist.com) do hackathon [@megahack](https://www.megahack.com.br/)
