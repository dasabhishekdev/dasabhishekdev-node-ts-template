import { createClient, RedisClientType } from "redis";

export default async (): Promise<RedisClientType> => {
  const client = createClient({
    url: process.env.REDIS_URL as string,
  });

  client.on("error", (err) => console.error("Redis Client Error", err));

  await client.connect();
  console.log("Redis connected successfully");
  return client as RedisClientType;
};
