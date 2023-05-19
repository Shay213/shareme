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

const getSpecificPinsParams = {
  type: "object",
  properties: {
    categoryId: { type: "string" },
  },
  required: ["categoryId"],
} as const;

export type GetSpecificPinsParams = FromSchema<typeof getSpecificPinsParams>;

const getSpecificPinsBody = {
  type: "object",
  properties: {
    searchTerm: { type: "string" },
  },
  required: ["searchTerm"],
};

export const getSpecificPinsSchema: FastifySchema = {
  params: getSpecificPinsParams,
  body: getSpecificPinsBody,
  response: {
    200: {
      type: "array",
      items: pin,
    },
  },
};
