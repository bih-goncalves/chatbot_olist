const twilioAPI = require('../services/TwilioAPI')

const from = 'gabriel.sgaspar@yahoo.com.br';
const subject = 'Resposta do Olibot à sua dúvida';

module.exports = {
    sendNewQuestionToSeller(request, response, db){
        // Enviar a pergunta para a API da Olist
    },
    sendNewAnswerToClient(request, response, db){
        const {
                    productName = "Notebook da nasa",
                    questionOwner = "Gaspar",
                    question = "Quais são as cores disponíveis?",
                    answer = "Temos nas cores azul, amarelo e magenta",
                    ownerEmail = 'gabriel.silva.gaspar@hotmail.com',                    
                } = request.body;
        // Enviar a resposta para o cliente usando a API da Twilio

        const text = "Olá, aqui é o Olibot! Estou te enviando esta mensagem pois o vendedor do protudo blablablá respondeu a sua pergunta, não é incrível?!\n Confira abaixo:";
        const html = `<p>Olá <strong>${questionOwner}</strong>, aqui é o Olibot!</br></br>Estou te enviando esta mensagem pois o vendedor do protudo <strong>${productName}</strong> respondeu a sua pergunta, não é incrível?!</br></br> Confira abaixo:</br> <strong>Pergunta: </strong>${question}</br><strong>Resposta: </strong>${answer}</br></br> É isso, obrigado! </br> Att, </br> Olibot, o bot da Olist.</p>`;
        const to = ownerEmail;

        try{
            twilioAPI.sendMessage({
                to, 
                from,
                subject,
                text,
                html
            });
        }catch(err)
        {
            throw err;
        }
        response.json({data:"Resposta enviada!"})
    }   
}