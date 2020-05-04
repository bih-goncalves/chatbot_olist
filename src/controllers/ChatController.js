const dbConnection = require('../database/db');

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

    async createChat(request, response, db){
        const {client="Fulano"} = request.body;
        const id = `${client}-${Date.now()}`
        const chat = {
                created_at: new Date(),
                chatId: id,
                clientName: client,
                messages:[]
        }
        // db.collection('chat').save(chat, (err, result) => {
        //     if (err) return console.log(err)
        //     console.log('Chat salvo no banco de dados!')
        // });
        // try{
        //     console.log("Esse é o DB: " + db)
        //     const promise = await db.collection('chat').insertOne(chat);
        // }catch(err){
        //     console.log(err.stack);
        // }
        dbConnection.insert('mydb','chat', chat,(result)=>{ // Success
            console.log("inserção de documento feita com sucesso!")
        }, (error) =>{ // Error
            console.log('Aconteceu um erro ao tentar inserir um documento no banco')
        });
        response.json({id:id});
    },

    async saveMessage(request, response, db){
        const {id} = request.params;
        console.log(id)
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





            
        }, (error) => { // Failure
            console.log("houve um erro no método find...");
        });
        response.json({data:"Mensagem Enviada"});
        // try{
        //     const queryResult = await db.collection('chat').find({chatId:id});
        //     queryResult.toArray( async (error, documents) => {
        //         if(error){throw error}
        //         let newMessages = []
        //         if(documents[0]["messages"].length){
        //             const content = JSON.parse(documents[0]["messages"]);
        //             newMessages = [...content,{
        //                 id: message_id,
        //                 from: "client",
        //                 date: Date(),
        //                 text: message
        //             }]
        //         }else{
        //             newMessages = [{
        //                 id: message_id,
        //                 from: "client",
        //                 date: Date(),
        //                 text: message
        //             }]
        //         }
        //         try{
        //             await db.collection('chat').update({chatId:id},{
        //                 $set:{
        //                     created_at: new Date(),
        //                     messages: JSON.stringify(newMessages)
        //             }});
        //         }catch(err){
        //             console.log(erro.stack);
        //         }
                
        //         response.json({data:"Mensagem Enviada"});
        //     });

        // }catch(err){
        //     console.log(err.stack);
        // }
        // db.collection('chat').find({chatId:id}).toArray((error, documents) => {
        //     if(error){throw error}
        //     let newMessages = []
        //     if(documents[0]["messages"].length){
        //         const content = JSON.parse(documents[0]["messages"]);
        //         newMessages = [...content,{
        //             id: message_id,
        //             from: "client",
        //             date: Date(),
        //             text: message
        //         }]
        //     }else{
        //         newMessages = [{
        //             id: message_id,
        //             from: "client",
        //             date: Date(),
        //             text: message
        //         }]
        //     }
            
        //     db.collection('chat').update({chatId:id},{
        //     $set:{
        //         created_at: new Date(),
        //         messages: JSON.stringify(newMessages)
        //     }});
        //     response.json({data:"Mensagem Enviada"});
        // });
    }
}