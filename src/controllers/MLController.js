const Ml_api = require('../services/MLAPI');

module.exports = {

    async handleMLNotification(request, response){
        console.log(request.body);
        const {resource,user_id,topic,application_id} = request.body;
        if(topic == 'questions'){
            console.log("CHEGOU NOTIFICAÇÃO DE PERGUNTA NO MERCADO LIVRE!");
            console.log("Respondendo...")
            const {id,question} = await Ml_api.getQuestionFromML(resource);
            console.log("Pergunta: " + question);
            //----------------------------------------
            // Envia a pergunta para o BOT
            //----------------------------------------
            Ml_api.sendAnswerForQuestion("Olá, assim que possível lhe responderei. Obrigado.",id);
        }
        response.status(200).send();
    }
}