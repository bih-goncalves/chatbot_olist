const dbConnection = require('../database/db');

module.exports = {

    teste(request, response){
        return response.json({data: "Helllo world!"});
    },

    listChatForId(request, response, db){
        const {id} = request.params;
        dbConnection.find('mydb','chat',{chatId:id},{_id:0},(documents) => { // Success
            console.log("documento encontrado com sucesso!");
            response.json({createdAt:documents[0]["created_at"] ,clientName: documents[0]["clientName"],messages: documents[0]["messages"]});
        }, (error) => {
            console.log("Houve um erro no método find...")
        })
    },

    async createChat(request, response, db){
        const {client="Fulano"} = request.body;
        const id = `${client}-${Date.now()}`
        const chat = {
                created_at: new Date(),
                chatId: id,
                clientName: client,
                messages:[]
        }
        dbConnection.insert('mydb','chat', chat,(result)=>{ // Success
            console.log("inserção de documento feita com sucesso!")
        }, (error) =>{ // Error
            console.log('Aconteceu um erro ao tentar inserir um documento no banco')
        });
        response.json({id:id});
    },

    async saveMessage(request, response, db){
        const {id} = request.params;
        const {message} = request.body;
        const message_id = `${id}/${Date.now()}`;
        dbConnection.find('mydb','chat',{chatId:id},null,(documents)=>{ // Success
            console.log("Mensagem encontrada com sucesso!");
            let newMessages = []
            if(documents[0]["messages"].length){
                const content = JSON.parse(documents[0]["messages"]);
                newMessages = [...content,{
                    id: message_id,
                    from: "client",
                    date: Date(),
                    text: message
                }]
            }else{
                newMessages = [{
                    id: message_id,
                    from: "client",
                    date: Date(),
                    text: message
                }]
            }
            dbConnection.update('mydb','chat',{chatId:id},{
                $set:{
                    created_at: new Date(),
                    messages: JSON.stringify(newMessages)
            }}, () => {
                console.log("Documento atualizado com sucesso!");
            }, (error) => {
                console.log("Aconteceu um erro na função update.")
            });
        }, (error) => { // Failure
            console.log("houve um erro no método find...");
        });
        response.json({data:"Mensagem Enviada"});
    }
}