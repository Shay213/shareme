import { RouteHandler } from "fastify";
import { AddCommentBody, GetCommentsParams } from "./schemas";

export const getComments: RouteHandler<{ Params: GetCommentsParams }> = async (
  req,
  reply
) => {
  const { pinId } = req.params;

  try {
    const comments = await req.server.prisma.comment.findMany({
      where: {
        pin: { id: pinId },
      },
      include: {
        owner: { select: { id: true, userName: true, imagePath: true } },
      },
    });
    return reply.code(200).send(comments);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const addComment: RouteHandler<{
  Params: GetCommentsParams;
  Body: AddCommentBody;
}> = async (req, reply) => {
  const { pinId } = req.params;
  const { ownerId, description } = req.body;
  try {
    await req.server.prisma.comment.create({
      data: {
        description,
        owner: { connect: { id: ownerId } },
        pin: { connect: { id: pinId } },
      },
    });
    return reply.code(200).send({ message: "Comment added successfully!" });
  } catch (error) {
    return reply.code(500).send(error);
  }
};
