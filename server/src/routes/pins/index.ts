import { FastifyInstance } from "fastify";
import { getPinsSchema, getPinsByCategorySchema } from "./schemas";
import { getPins, getPinsByCategory } from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/pins", { schema: getPinsSchema }, getPins);
  fastify.get(
    "/pins/:categoryId",
    { schema: getPinsByCategorySchema },
    getPinsByCategory
  );
};
