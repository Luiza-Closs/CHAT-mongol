const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.DB_HOST);
  await client.connect();

  singleton = client.db(process.env.DB_DATABASE);
  return singleton;
}

async function findAll(collection) {
  const db = await connect();
  return db.collection(collection).find().toArray();
}

async function insertOne(collection, object) {
  const db = await connect();
  const result = await db.collection(collection).insertOne(object);
  return result;
}

async function findOne(collection, id) {
  const db = await connect();
  const obj = await db.collection(collection).findOne({ _id: new ObjectId(id) });
  if (obj) {
    return obj;
  }
  return false;
}

async function updateOne(collection, object, param) {
  const db = await connect();
  const result = await db
    .collection(collection)
    .updateOne(param, { $set: object });
  return result;
}

module.exports = { findAll, insertOne, findOne, updateOne };