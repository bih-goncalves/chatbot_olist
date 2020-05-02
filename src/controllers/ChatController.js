module.exports = {

    teste(request, response){
        return response.json({data: "Helllo world!"});
    },

    listChatForId(request, response, db){
        const {id} = request.params;
        db.collection('chat').find({chatId: id},{_id:0}).toArray((error, documents)=> {
            if(error) {throw error}
            response.json({createdAt:documents[0]["created_at"] ,clientName: documents[0]["clientName"],messages: documents[0]["messages"]});
        });
    },

    createChat(request, response, db){
       const {client="Fulano"} = request.body;
       const id = `${client}-${Date.now()}`
       const chat = {
            created_at: new Date(),
            chatId: id,
            clientName: client,
            messages:[]
       }
       db.collection('chat').save(chat, (err, result) => {
        if (err) return console.log(err)
            console.log('Chat salvo no banco de dados!')
        });
        response.json({id:id});
    },

    saveMessage(request, response, db){
        const {id} = request.params;
        console.log(id)
        const {message} = request.body;
        const message_id = `${id}/${Date.now()}`;
        db.collection('chat').find({chatId:id}).toArray((error, documents) => {
            if(error){throw error}
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
            
            db.collection('chat').update({chatId:id},{
            $set:{
                created_at: new Date(),
                messages: JSON.stringify(newMessages)
            }});
            // const updatedObjc = {...document, messages: newMessages};
            // console.log(document);
            response.json({data:"Mensagem Enviada"});
        });
    }
}