import { FastifyInstance } from "fastify";
import {
  getPinsSchema,
  getPinsByCategorySchema,
  savePinSchema,
  deletePinSchema,
  createPinSchema,
  getPinSchema,
  searchPinsSchema,
} from "./schemas";
import {
  getPins,
  getPinsByCategory,
  savePin,
  deletePin,
  createPin,
  getPin,
  searchPins,
} from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/", { schema: getPinsSchema }, getPins);
  fastify.get("/:pinId", { schema: getPinSchema }, getPin);
  fastify.get(
    "/category/:categoryId",
    { schema: getPinsByCategorySchema },
    getPinsByCategory
  );
  fastify.get("/search", { schema: searchPinsSchema }, searchPins);
  fastify.patch("/:pinId", { schema: savePinSchema }, savePin);
  fastify.delete("/:pinId", { schema: deletePinSchema }, deletePin);
  fastify.post("/", { schema: createPinSchema }, createPin);
};
