import { FastifyInstance } from "fastify";
import {
  getPinsSchema,
  getPinsByCategorySchema,
  savePinSchema,
  deletePinSchema,
  createPinSchema,
} from "./schemas";
import {
  getPins,
  getPinsByCategory,
  savePin,
  deletePin,
  createPin,
} from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/", { schema: getPinsSchema }, getPins);
  fastify.get(
    "/:categoryId",
    { schema: getPinsByCategorySchema },
    getPinsByCategory
  );
  fastify.patch("/:pinId", { schema: savePinSchema }, savePin);
  fastify.delete("/:pinId", { schema: deletePinSchema }, deletePin);
  fastify.post("/", { schema: createPinSchema }, createPin);
};
