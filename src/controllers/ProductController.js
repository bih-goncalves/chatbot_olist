module.exports = {
    
    listProducts(request, response, db){
        const {page = 1, number_per_page = 10} = request.query;
        const total_products = db.collection('products').count();
        db.collection('products')
            .find({},{_id:0})
            .skip((page-1)*number_per_page)
            .limit(number_per_page)
            .toArray((error, documents) => {
                if (error) throw error;
                response.header('X-Total-Count', total_products);
                response.json(documents);
            });
    },

    getProduct(request, response, db){
        const {id} = request.params;
        db.collection('products').find({product_id: id},{_id:0}).toArray((error, documents) => {
            if (error) throw error;
            response.json(documents)
        });
    },

    insertProduct(request, response, db){
        const {name, price, image_url, description, codeIdentifier} = request.body;
        const product_id = `${codeIdentifier}-${Date.now()}`;
        const data = {
            name,
            price,
            image_url,
            description,
            codeIdentifier,
            product_id
        }
        db.collection('products').save(data, (err, result) => {
            if (err) return console.log(err)
            console.log('Produto salvo no banco de dados!')
        });
        response.json({id:product_id})
    }
}