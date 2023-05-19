import Fastify from "fastify";
import { config } from "dotenv";
config();
import fastifyCors from "@fastify/cors";

// plugins
import prismaPlugin from "./plugins/prisma";
import uploadFile from "./plugins/uploadFile";

// routes
import auth from "./routes/auth";

const fastify = Fastify({ logger: true });
fastify.register(fastifyCors, { credentials: true });
fastify.register(prismaPlugin);
fastify.register(uploadFile);

// routes
fastify.register(auth, { prefix: "/api/auth" });

const start = async () => {
  try {
    await fastify.listen({ port: +(process.env?.PORT ?? 3000) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
