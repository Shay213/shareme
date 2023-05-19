import { RouteHandler } from "fastify";
import { GetSpecificPinsBody, GetSpecificPinsParams } from "./schemas";

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

export const getSpecificPins: RouteHandler<{
  Params: GetSpecificPinsParams;
  Body: GetSpecificPinsBody;
}> = async (req, reply) => {
  const { categoryId } = req.params;
  const { searchTerm } = req.body;

  const filters = {
    ...(categoryId && { category: categoryId }),
    ...(searchTerm && {
      OR: {
        title: { contains: searchTerm },
        category: { contains: searchTerm },
        about: { contains: searchTerm },
      },
    }),
  };

  try {
    const pins = await req.server.prisma.pin.findMany({
      where: { AND: { ...filters } },
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
