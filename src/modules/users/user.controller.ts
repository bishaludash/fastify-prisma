import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";
import { createUserSchema } from "./user.schema";

export const registerUserHandler = async (
  req: FastifyRequest<{ Body: createUserSchema }>,
  res: FastifyReply
) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    return res.code(201).send(user);
  } catch (error) {
    console.log(error);
    return res.code(500).send(error);
  }
};
