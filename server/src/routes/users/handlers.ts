import { RouteHandler } from "fastify";
import { GetUserParams } from "./schemas";

export const getUser: RouteHandler<{ Params: GetUserParams }> = async (
  req,
  reply
) => {
  const { id } = req.params;
  try {
    const user = await req.server.prisma.user.findUnique({
      where: { id },
      include: {
        comments: true,
        ownPins: { include: { owner: true, savedBy: true } },
        savedPins: { include: { owner: true, savedBy: true } },
      },
    });
    return reply.code(200).send(user);
  } catch (error) {
    return reply.code(500).send(error);
  }
};
