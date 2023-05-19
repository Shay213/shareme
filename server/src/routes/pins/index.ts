import { FastifyInstance } from "fastify";
import { getPinsSchema, getSpecificPinsSchema } from "./schemas";
import { getPins, getSpecificPins } from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/pins", { schema: getPinsSchema }, getPins);
  fastify.get(
    "/pins/:categoryId",
    { schema: getSpecificPinsSchema },
    getSpecificPins
  );
};
