import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail } from "./user.service";
import { CreateUserInput, LoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { fastify } from "../../app";

export const registerUserHandler = async (
  req: FastifyRequest<{ Body: CreateUserInput }>,
  res: FastifyReply
) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    return res.code(201).send(user);
  } catch (error) {
    // console.log(error);
    return res.code(500).send(error);
  }
};

export const loginHandler = async (
  req: FastifyRequest<{
    Body: LoginInput;
  }>,
  rep: FastifyReply
) => {
  const body = req.body;

  // find user by email
  const user = await findUserByEmail(body.email);
  if (!user) {
    return rep.code(401).send({ message: "Invalid email or password" });
  }

  // verify password
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  //generate access token
  if (correctPassword) {
    const { password, salt, ...rest } = user;
    return rep.send({
      accessToken: fastify.jwt.sign(rest),
    });
  }

  // respond
  return rep.code(401).send({ message: "Invalid email or password" });
};
