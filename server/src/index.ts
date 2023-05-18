import Fastify from "fastify";
import { config } from "dotenv";
config();

// plugins
import prismaPlugin from "./plugins/prisma";

const fastify = Fastify({ logger: true });

fastify.register(prismaPlugin);
console.log("hel");

const start = async () => {
  try {
    await fastify.listen({ port: +(process.env?.PORT ?? 3000) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
