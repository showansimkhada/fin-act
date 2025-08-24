import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGO_URI!;

const clientPromise: Promise<MongoClient> = new MongoClient(MONGODB_URI, {
  connectTimeoutMS: 300000,
  tls: true,
}).connect()

export default clientPromise;