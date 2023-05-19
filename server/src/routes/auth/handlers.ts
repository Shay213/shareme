import { RouteHandler } from "fastify";
import { googleSignUpBody } from "./schemas";

export const googleSignUp: RouteHandler<{ Body: googleSignUpBody }> = async (
  req,
  reply
) => {
  const { id, userName, imagePath } = req.body;
  try {
    await req.server.prisma.user.upsert({
      where: { id },
      update: { id, userName, imagePath },
      create: { id, userName, imagePath },
    });
    return reply
      .code(200)
      .send({ message: "Logged in with google successfully!" });
  } catch (error) {
    return reply.code(500).send(error);
  }
};
