import Fastify from "fastify";
import userRoutes from "./modules/users/user.route";
import { userSchemas } from "./modules/users/user.schema";

const fastify = Fastify({
  logger: true,
});

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
