const Ml_api = require('../services/MLAPI');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

module.exports = {
  async handleMLNotification(request, response) {
    console.log(request.body);
    const { resource, user_id, topic, application_id } = request.body;
    if (topic == 'questions') {
      console.log('CHEGOU NOTIFICAÇÃO DE PERGUNTA NO MERCADO LIVRE!');
      console.log('Respondendo...');
      // A unique identifier for the given session
      const projectId = 'chatbot-olist-yrbhdy';
      const sessionId = uuid.v4();

      // Create a new session
      const sessionClient = new dialogflow.SessionsClient();
      const sessionPath = sessionClient.sessionPath(projectId, sessionId);
      const { id, text } = await Ml_api.getQuestionFromML(resource);
      console.log('Pergunta: ' + text);

      const call = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: text,
            // The language used by the client (en-US)
            languageCode: 'pt-BR',
          },
        },
      };

      const responses = await sessionClient.detectIntent(call);

      const result = responses[0].queryResult;

      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
        Ml_api.sendAnswerForQuestion(
          `Olá! ${result.fulfillmentText}. Obrigado.`,
          id,
        );
      } else {
        Ml_api.sendAnswerForQuestion(
          'Olá, assim que possível lhe responderei. Obrigado.',
          id,
        );
      }
    }
    response.status(200).send();
  },
};
