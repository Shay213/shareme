import { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";

const user = {
  type: "object",
  properties: {
    id: { type: "string" },
    userName: { type: "string" },
    imagePath: { type: "string" },
  },
  required: ["id", "userName", "imagePath"],
};

const pins = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    about: { type: "string" },
    destination: { type: "string" },
    category: { type: "string" },
    imagePath: { type: "string" },
    owner: user,
    savedBy: {
      type: "array",
      items: user,
    },
  },
};

const comments = {
  type: "object",
  properties: {
    id: { type: "string" },
    description: { type: "string" },
    pinId: { type: "string" },
    ownerId: { type: "string" },
  },
};

const getUserParams = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
} as const;

export type GetUserParams = FromSchema<typeof getUserParams>;

const getUserSuccessReply = {
  type: "object",
  properties: {
    id: { type: "string" },
    userName: { type: "string" },
    imagePath: { type: "string" },
    ownPins: {
      type: "array",
      items: pins,
    },
    savedPins: {
      type: "array",
      items: pins,
    },
    comments: {
      type: "array",
      items: comments,
    },
  },
};

export const getUserSchema: FastifySchema = {
  params: getUserParams,
  response: {
    200: getUserSuccessReply,
  },
};
