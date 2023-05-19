import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import path from "path";
import fastifyMultipart from "@fastify/multipart";
import { MultipartFile } from "@fastify/multipart";

const pump = util.promisify(pipeline);
const uploadPath = path.join(process.cwd(), "/public/images");

const uploadFile: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(fastifyMultipart);

  fastify.addHook("onRequest", async (req, reply) => {
    if (req.isMultipart()) {
      let body = {};
      const parts = req.parts();
      for await (const part of parts) {
        if (part.type === "file") {
          await pump(part.file, fs.createWriteStream(part.filename));
        } else {
          body = { ...body, [part.fieldname]: part.value };
        }
      }
      req.body = body;
    }
  });

  done();
};

export default fp(uploadFile);
