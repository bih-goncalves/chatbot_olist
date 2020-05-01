module.exports = {

    teste(request, response){
        return response.json({data: "Helllo world!"});
    },

    listChatForId(request, response){
        const {id} = request.params;
        response.json({data:{listForId: id}});
    },

    saveMessage(request, response){
        const {id} = request.params;
        response.json({data:{messageRegisteredForId:id}})
    }
}