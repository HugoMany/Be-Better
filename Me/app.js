const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://BBT:0cka7EfxFSpfDkBk@cluster0.54ar39o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
