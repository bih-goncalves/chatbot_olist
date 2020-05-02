module.exports = {

    teste(request, response){
        return response.json({data: "Helllo world!"});
    },

    listChatForId(request, response, db){
        const {id} = request.params;
        db.collection('data').save({data_test:"Apenas um teste"}, (err, result) => {
            if (err) return console.log(err)
            console.log('Salvo no Banco de Dados')
        });
        db.collection('data').save({data_test:"Apenas mais um teste"}, (err, result) => {
            if (err) return console.log(err)
            console.log('Salvo no Banco de Dados')
        });
        response.json({data:{listForId: id}});
    },

    saveMessage(request, response){
        const {id} = request.params;
        response.json({data:{messageRegisteredForId:id}})
    }
}