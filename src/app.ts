import Fastify from "fastify";
import userRoutes from "./modules/users/user.route";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

fastify.get("/healthcheck", async (req, res) => {
  res.send({ status: "OK" });
});

// Run the server!
const start = async () => {
  try {
    fastify.register(userRoutes, { prefix: "api/users" });
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
