import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "fastify-jwt";
import userRoutes from "./modules/users/user.route";
import { userSchemas } from "./modules/users/user.schema";

export const fastify = Fastify({
  logger: true,
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}

fastify.register(fastifyJwt, {
  secret: "asdbkjasdilnasdopikjnnaksdhu12",
});

fastify.decorate(
  "authenticate",
  async (req: FastifyRequest, rep: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      return rep.send(error);
    }
  }
);
// Declare a healthcheck
fastify.get("/healthcheck", async (req, res) => {
  res.send({ status: "OK" });
});

// Run the server!
const main = async () => {
  for (const schema of userSchemas) {
    fastify.addSchema(schema);
  }

  try {
    fastify.register(userRoutes, { prefix: "api/users" });
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
main();
