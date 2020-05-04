const axios = require('axios');

const ML_URLBASE = 'https://api.mercadolibre.com';

const ACCESS_TOKEN = process.env.ML_ACCESS_TOKEN;

async function getQuestionFromML(resourceURL) {
  const url = ML_URLBASE + resourceURL;
  const response = await axios.get(url);
  const { id, text } = response.data;
  return { id, text };
}

async function sendAnswerForQuestion(answer, questionId) {
  const url = `${ML_URLBASE}/answers?access_token=${ACCESS_TOKEN}`;
  axios
    .post(url, {
      question_id: questionId,
      text: answer,
    })
    .catch(function (error) {
      console.log(error);
    });
}

function notifyOlistAPI(text, id) {
  // ENVIA A PERGUNTA E A ID DELA PRO BACK DA OLIST
  // QUANDO O VENDEDOR RESPONDER, A API DA OLIST VAI ENVIAR UMA NOTIFICAÇÃO DE VOLTA ATRAVÉS DA ROTA
  // >> /olist/notifications
  // ESSA PARTE É MOCKADA
  // MANDAMOS OS SEGUINTES DADOS PARA A OLIST:
  //  pergunta, id da pergunta e demais informações que a Olist precise para identificar o produto
  // ELA, POR SUA VEZ, AO NOTIFICAR DE VOLTA, DEVE RETORNAR ESSES DADOS
  // JUNTO COM A RESPOSTA DO VENDEDOR
  console.log('Pergunta enviada para o vendedor da Olist...');
}

function handleNotificationFromOlist(request, response) {
  const { text, id, answer } = request.body;
  const url = `${ML_URLBASE}/answers?access_token=${ACCESS_TOKEN}`;
  axios
    .post(url, {
      question_id: id,
      text: answer,
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = {
  getQuestionFromML,
  sendAnswerForQuestion,
  notifyOlistAPI,
  handleNotificationFromOlist,
};
