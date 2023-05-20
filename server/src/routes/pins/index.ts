import { FastifyInstance } from "fastify";
import {
  getPinsSchema,
  getPinsByCategorySchema,
  savePinSchema,
} from "./schemas";
import { getPins, getPinsByCategory, savePin } from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/pins", { schema: getPinsSchema }, getPins);
  fastify.get(
    "/pins/:categoryId",
    { schema: getPinsByCategorySchema },
    getPinsByCategory
  );
  fastify.patch("pins/:pinId", { schema: savePinSchema }, savePin);
};
