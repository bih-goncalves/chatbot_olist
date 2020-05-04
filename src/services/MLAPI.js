const axios = require('axios');

const ML_URLBASE = "https://api.mercadolibre.com"

const ACCESS_TOKEN = process.env.ML_ACCESS_TOKEN;

async function getQuestionFromML(resourceURL){
    const url = ML_URLBASE + resourceURL;
    const response = await axios.get(url);
    const {id,text} = response.data;
    return {id,text};
}

async function sendAnswerForQuestion(answer, questionId){
    const url = `${ML_URLBASE}/answers?access_token=${ACCESS_TOKEN}"`;
    axios.post(url, {
        "question_id": questionId,
        "text": answer
      })
      .catch(function (error) {
        console.log(error);
      });
}

module.exports = {
    getQuestionFromML,
    sendAnswerForQuestion
}