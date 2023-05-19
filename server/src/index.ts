import Fastify from "fastify";
import { config } from "dotenv";
config();
import fastifyCors from "@fastify/cors";

// plugins
import prismaPlugin from "./plugins/prisma";
import uploadFile from "./plugins/uploadFile";

// routes
import auth from "./routes/auth";
import users from "./routes/users";

const fastify = Fastify({ logger: true });
fastify.register(fastifyCors, {
  credentials: true,
  origin: "http://localhost:5173",
});
fastify.register(prismaPlugin);
fastify.register(uploadFile);

// routes
fastify.register(auth, { prefix: "/api/auth" });
fastify.register(users, { prefix: "/api/users" });

const start = async () => {
  try {
    await fastify.listen({ port: +(process.env?.PORT ?? 3000) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
