const dialogflow = require('dialogflow');
const uuid = require('uuid');

module.exports = {
  async getAnswerForQuestion(request, response) {
    // A unique identifier for the given session
    const projectId = 'chatbot-olist-yrbhdy';
    const sessionId = uuid.v4();

    const { chatId, question } = request.body;
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // Acessa a api do bot para obter a resposta da pergunta referenciada em "question"
    // Salva a resposta no DB, especificamente no chat de id referenciado por "chatId"
    const call = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: question,
          // The language used by the client (en-US)
          languageCode: 'pt-BR',
        },
      },
    };
    //...

    // Send request and log result
    const responses = await sessionClient.detectIntent(call);

    const result = responses[0].queryResult;

    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
    // Retorna a resposta da pergunta para o front
    // Caso o bot não saiba responder a pergunta, envia a pergunta para o vendedor
    response.json({ data: { answer: result.fulfillmentText } });
  },
};
