import { RouteHandler } from "fastify";
import {
  CreatePinBody,
  DeletePinParams,
  GetPinParams,
  GetPinsByCategoryParams,
  SavePinBody,
  SavePinParams,
  SearchPinsQuery,
} from "./schemas";

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

export const deletePin: RouteHandler<{ Params: DeletePinParams }> = async (
  req,
  reply
) => {
  const { pinId } = req.params;
  try {
    await req.server.prisma.pin.delete({
      where: {
        id: pinId,
      },
    });
    return reply.code(200).send({ message: "Pin deleted successfully!" });
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const createPin: RouteHandler<{ Body: CreatePinBody }> = async (
  req,
  reply
) => {
  const { title, about, destination, category, imagePath, ownerId } = req.body;
  try {
    await req.server.prisma.pin.create({
      data: {
        about,
        category,
        destination,
        imagePath,
        title,
        owner: { connect: { id: ownerId } },
      },
    });
    return reply.code(200).send({ message: "Pin created successfully!" });
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const getPin: RouteHandler<{ Params: GetPinParams }> = async (
  req,
  reply
) => {
  const { pinId } = req.params;
  try {
    const pin = await req.server.prisma.pin.findUnique({
      where: { id: pinId },
      include: {
        owner: true,
        savedBy: true,
      },
    });
    return reply.code(200).send(pin);
  } catch (error) {
    return reply.code(500).send(error);
  }
};

export const searchPins: RouteHandler<{
  Querystring: SearchPinsQuery;
}> = async (req, reply) => {
  const { term } = req.query;

  try {
    if (term === "") {
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
    }
    const pins = await req.server.prisma.pin.findMany({
      where: {
        OR: {
          category: { contains: term, mode: "insensitive" },
          title: { contains: term, mode: "insensitive" },
          about: { contains: term, mode: "insensitive" },
          destination: { contains: term, mode: "insensitive" },
        },
      },
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
