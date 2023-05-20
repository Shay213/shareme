import { RouteHandler } from "fastify";
import { GetPinsByCategoryParams, SavePinBody, SavePinParams } from "./schemas";

export const getPins: RouteHandler = async (req, reply) => {
  try {
    const pins = await req.server.prisma.pin.findMany({
      select: {
        id: true,
        imagePath: true,
        destination: true,
        owner: {
          select: {
            id: true,
            userName: true,
            imagePath: true,
          },
        },
        savedBy: {
          select: {
            id: true,
            userName: true,
            imagePath: true,
          },
        },
      },
    });
    return reply.code(200).send(pins);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const getPinsByCategory: RouteHandler<{
  Params: GetPinsByCategoryParams;
}> = async (req, reply) => {
  const { categoryId } = req.params;

  try {
    const pins = await req.server.prisma.pin.findMany({
      where: { category: categoryId },
      select: {
        id: true,
        imagePath: true,
        destination: true,
        owner: {
          select: {
            id: true,
            userName: true,
            imagePath: true,
          },
        },
        savedBy: {
          select: {
            id: true,
            userName: true,
            imagePath: true,
          },
        },
      },
    });
    return reply.code(200).send(pins);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const savePin: RouteHandler<{
  Params: SavePinParams;
  Body: SavePinBody;
}> = async (req, reply) => {
  const { pinId } = req.params;
  const { userId } = req.body;
  try {
    await req.server.prisma.pin.update({
      where: { id: pinId },
      data: {
        savedBy: { connect: { id: userId } },
      },
    });
    return reply.code(200).send({ message: "Pin saved successfully!" });
  } catch (error) {
    return reply.code(500).send(error);
  }
};
