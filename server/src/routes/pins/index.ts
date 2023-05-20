import { FastifyInstance } from "fastify";
import {
  getPinsSchema,
  getPinsByCategorySchema,
  savePinSchema,
  deletePinSchema,
} from "./schemas";
import { getPins, getPinsByCategory, savePin, deletePin } from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/pins", { schema: getPinsSchema }, getPins);
  fastify.get(
    "/pins/:categoryId",
    { schema: getPinsByCategorySchema },
    getPinsByCategory
  );
  fastify.patch("pins/:pinId", { schema: savePinSchema }, savePin);
  fastify.delete("pins/:pinId", { schema: deletePinSchema }, deletePin);
};
