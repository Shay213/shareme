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

const pin = {
  type: "object",
  properties: {
    id: { type: "string" },
    imagePath: { type: "string" },
    destination: { type: "string" },
    owner: user,
    savedBy: {
      type: "array",
      items: user,
    },
  },
  required: ["id", "imagePath", "destination", "owner", "savedBy"],
};

export const getPinsSchema: FastifySchema = {
  response: {
    200: {
      type: "array",
      items: pin,
    },
  },
};

const getPinsByCategoryParams = {
  type: "object",
  properties: {
    categoryId: { type: "string" },
  },
  required: ["categoryId"],
} as const;

export type GetPinsByCategoryParams = FromSchema<
  typeof getPinsByCategoryParams
>;

export const getPinsByCategorySchema: FastifySchema = {
  params: getPinsByCategoryParams,
  response: {
    200: {
      type: "array",
      items: pin,
    },
  },
};

const savePinParams = {
  type: "object",
  properties: {
    pinId: { type: "string" },
  },
  required: ["pinId"],
} as const;

export type SavePinParams = FromSchema<typeof savePinParams>;

const savePinBody = {
  type: "object",
  properties: {
    userId: { type: "string" },
  },
  required: ["userId"],
} as const;

export type SavePinBody = FromSchema<typeof savePinBody>;

const savePinSuccessReply = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
};

export const savePinSchema: FastifySchema = {
  params: savePinParams,
  body: savePinBody,
  response: {
    200: savePinSuccessReply,
  },
};

const deletePinParams = {
  ...savePinParams,
} as const;

export type DeletePinParams = FromSchema<typeof deletePinParams>;

const deletePinSuccessReply = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
};

export const deletePinSchema: FastifySchema = {
  params: deletePinParams,
  response: {
    200: deletePinSuccessReply,
  },
};
