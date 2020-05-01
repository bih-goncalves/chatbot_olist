module.exports = {
    
    listProducts(request, response){
        response.json({data:{productList:[]}});
    },

    getProduct(request, response){
        response.json({data:{product:[]}});
    }
}