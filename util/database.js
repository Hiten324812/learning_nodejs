const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://hitenmistry354:hiten@cluster0.cal3ddh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let dbs;

const mongoconnect = callback => {
    
client.connect(err => {
  console.log(err);
})

.then( result => {
    dbs = result.db('test');
    callback();

})
.catch ( err => {
    console.log(err);
})
}

const getdb = () => {

    if (dbs)
    {
        return dbs;
    }
   
    throw 'no database found';

}
exports.mongoconnect = mongoconnect;
exports.getdb = getdb;

