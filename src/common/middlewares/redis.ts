import {createClient, RedisClient} from "redis";

export const createRedisClient = (url: string): RedisClient => {
  const client = createClient(url);

  client.on("error", (error: Error) => {
    console.error(error);
  });

  client.on("connect", () => {
    console.info("redis is connected to", url);
  });

  client.on("ready", () => {
    console.info("redis is ready");
  });

  client.on("end", () => {
    console.info("redis connection is closed");
  });

  return client;
};
