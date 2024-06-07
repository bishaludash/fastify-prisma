import { FastifyInstance } from "fastify";
import {
  registerUserHandler,
  loginHandler,
  getUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  fastify.get("/", { preHandler: [fastify.authenticate] }, getUserHandler);
};

export default userRoutes;
