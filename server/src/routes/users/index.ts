import { FastifyInstance } from "fastify";
import { getUserSchema } from "./schemas";
import { getUser } from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/:id", { schema: getUserSchema }, getUser);
};
