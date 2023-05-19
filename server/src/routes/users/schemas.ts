import { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { Pin, Comment } from "@prisma/client";

const pins = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    about: { type: "string" },
    destination: { type: "string" },
    category: { type: "string" },
    imagePath: { type: "string" },
    ownerId: { type: "string" },
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
