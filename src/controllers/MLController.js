module.exports = {
    handleMLNotification(request, response){
        console.log("CHEGOU NOTIFICAÇÃO DO MERCADO LIVRE!");
        console.log(request.body);
    }
}