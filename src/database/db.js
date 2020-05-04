const {MongoClient} = require('mongodb');

let login_mongo = null;
let senha_mongo = null;

// For development
// const sensitiveData = require('../../API_Key');
// login_mongo = sensitiveData.MONGO_LOGIN;
// senha_mongo = sensitiveData.MONGO_SENHA;

// For production
login_mongo = process.env.MONGO_LOGIN;
senha_mongo = process.env.MONGO_SENHA;

const MONGO_URL = `mongodb+srv://${login_mongo}:${senha_mongo}@mongodbolist-kpk1u.gcp.mongodb.net/test?retryWrites=true&w=majority`;

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

function find(
    dbName,
    dbCollectionName,
    filters = null,
    restrictions = null,
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
            dbCollection.find(filters,restrictions).toArray((error, results) => {
                if (error) return failureCallback(error);
                successCallback(results);
            });
        }
    });
}

function update(
    dbName,
    dbCollectionName,
    filters = null,
    options = null,
    successCallback,
    failureCallback
){
    if(options != null && filters != null){
        MongoClient.connect(MONGO_URL, function(err, dbInstance) {
            if (err) {
                console.log(`[MongoDB connection] ERROR: ${err}`);
                failureCallback(err); // this should be "caught" by the calling function
            } else {
                const dbObject = dbInstance.db(dbName);
                const dbCollection = dbObject.collection(dbCollectionName);
                dbCollection.updateOne(filters, options);
                successCallback();
            }
        });
    }
}

function count(
    dbName,
    dbCollectionName,
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
            const counter = dbCollection.count();
            successCallback(counter);
        }
    });
}

module.exports = {
    initialize,
    insert,
    find,
    update
};