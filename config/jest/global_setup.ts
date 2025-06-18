import { MongoMemoryServer } from "mongodb-memory-server";

export default async function globalSetup() {
  // @ts-ignore
  global.__MONGO_MEMORY_SERVER_INSTANCE__ = await MongoMemoryServer.create();
  process.env.MONGODB_URI = "mongodb://localhost:27017/boilerplate-test";
}
