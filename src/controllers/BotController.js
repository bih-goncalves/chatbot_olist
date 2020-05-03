module.exports = {
    getAnswerForQuestion(request, response){
        const {chatId, question} = request.body;
        //...
        // Acessa a api do bot para obter a resposta da pergunta referenciada em "question"
        // Salva a resposta no DB, especificamente no chat de id referenciado por "chatId"
        // Retorna a resposta da pergunta para o front
        response.json({data:{answer:"Sua resposta"}});
    }
}