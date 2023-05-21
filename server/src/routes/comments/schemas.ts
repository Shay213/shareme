import { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";
import { user } from "../pins/schemas";

const getCommentsParams = {
  type: "object",
  properties: {
    pinId: { type: "string" },
  },
  required: ["pinId"],
} as const;

export type GetCommentsParams = FromSchema<typeof getCommentsParams>;

const comment = {
  type: "object",
  properties: {
    id: { type: "string" },
    description: { type: "string" },
    pinId: { type: "string" },
    owner: user,
  },
  required: ["id", "description", "pinId", "owner"],
};

const comments = {
  type: "array",
  items: comment,
};

export const getCommentsSchema: FastifySchema = {
  params: getCommentsParams,
  response: {
    200: comments,
  },
};

const addCommentBody = {
  type: "object",
  properties: {
    ownerId: { type: "string" },
    description: { type: "string" },
  },
  required: ["ownerId", "description"],
} as const;

export type AddCommentBody = FromSchema<typeof addCommentBody>;

export const addCommentSchema: FastifySchema = {
  params: getCommentsParams,
  body: addCommentBody,
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
      required: ["message"],
    },
  },
};
