const {MongoClient} = require('mongodb');
const sensitiveData = require('../../API_Key');

const MONGO_URL = `mongodb+srv://${sensitiveData.MONGO_LOGIN}:${sensitiveData.MONGO_SENHA}@mongodbolist-kpk1u.gcp.mongodb.net/test?retryWrites=true&w=majority`;

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(MONGO_URL, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            dbCollection.createIndex({created_at:1},{expireAfterSeconds:600});
            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbInstance);
        }
    });
}

function insert(
    dbName,
    dbCollectionName,
    document,
    successCallback,
    failureCallback
){
    MongoClient.connect(MONGO_URL, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            dbCollection.insertOne(document, (error,result)=>{
                if (error) return failureCallback(error);
                successCallback(result);
            });
        }
    });
}



module.exports = {
    initialize,
    insert
};