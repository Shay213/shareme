import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import path from "path";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";

const pump = util.promisify(pipeline);
const uploadPath = path.join(process.cwd(), "/public/images");
const accessFilesPath = "http://localhost:8800/api/uploads/";

const uploadFile: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(fastifyMultipart);

  fastify.register(fastifyStatic, {
    root: uploadPath,
    prefix: "/api/uploads",
  });

  fastify.post("/api/files/upload", async (req, reply) => {
    if (req.isMultipart()) {
      const parts = req.parts();
      const uploadedFilesPaths = [];
      for await (const part of parts) {
        if (part.type === "file") {
          try {
            await pump(
              part.file,
              fs.createWriteStream(uploadPath + `/${part.filename}`)
            );
            uploadedFilesPaths.push(accessFilesPath + part.filename);
          } catch (error) {
            return reply.code(500).send(error);
          }
        }
      }
      return reply.code(200).send(uploadedFilesPaths);
    } else {
      return reply.code(500).send({ message: "No files found!" });
    }
  });

  fastify.get(
    "/api/download/:filename",
    {
      schema: {
        params: {
          type: "object",
          properties: { filename: { type: "string" } },
          required: ["filename"],
        },
      },
    },
    (req, reply) => {
      const { filename } = req.params as { filename: string };
      reply.header("Content-Disposition", `attachment; filename="${filename}"`);
      reply.sendFile(filename, uploadPath);
    }
  );

  done();
};

export default fp(uploadFile);
