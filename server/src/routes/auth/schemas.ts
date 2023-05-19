import { FastifySchema } from "fastify";
import { FromSchema } from "json-schema-to-ts";

const googleSignUpBody = {
  type: "object",
  properties: {
    id: { type: "string" },
    userName: { type: "string" },
    imagePath: { type: "string" },
  },
  required: ["id", "userName", "imagePath"],
} as const;

export type googleSignUpBody = FromSchema<typeof googleSignUpBody>;

export const googleSignUpSchema: FastifySchema = {
  body: googleSignUpBody,
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
