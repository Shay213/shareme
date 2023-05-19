import { FastifyInstance } from "fastify";
import { googleSignUp } from "./handlers";
import { googleSignUpSchema } from "./schemas";

export default async (fastify: FastifyInstance) => {
  fastify.post("/googlesignup", { schema: googleSignUpSchema }, googleSignUp);
};
