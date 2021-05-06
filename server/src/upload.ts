const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
/* use the Cosmos DB connection string you copied ealier and replace in the `url` variable */
const url = "mongodb://swacbloomsdb:xxxxxxxxxx@swacbloomsdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@swacbloomsdb@";
const client = new MongoClient(url);

let resetList = [
  {
    _id: uuidv4(),
    name: "Microphone",
    description: "Noise cancelling microphone for recording sessions",
    url:
      "https://cdn.pixabay.com/photo/2020/09/23/02/01/microphone-5594702_960_720.jpg",
  },
  {
    _id: uuidv4(),
    name: "Macbook",
    description: "A laptop with awesome perfomance for dev work",
    url:
      "https://cdn.pixabay.com/photo/2014/09/24/14/29/mac-459196_960_720.jpg",
  },
  {
    _id: uuidv4(),
    name: "Camera",
    description: "Helps to record video sessions",
    url:
      "https://cdn.pixabay.com/photo/2014/05/05/19/53/keyboard-338505_960_720.jpg",
  },
];

module.exports = async function (context, req) {
  await client.connect();
  const database = client.db("crud");
  const collection = database.collection("wishlist");
  await collection.deleteMany({});
  await collection.insertMany(resetList);

  return (context.res = {
    status: 200,
    body: "Initialization successful",
  });
};