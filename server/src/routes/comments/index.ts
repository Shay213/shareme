import { FastifyInstance } from "fastify";
import { getCommentsSchema, addCommentSchema } from "./schemas";
import { getComments, addComment } from "./handlers";

export default async (fastify: FastifyInstance) => {
  fastify.get("/:pinId", { schema: getCommentsSchema }, getComments);
  fastify.post("/:pinId", { schema: addCommentSchema }, addComment);
};
