import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { createUserSchema } from "./user.schema";

export const createUser = async (input: createUserSchema) => {
  const { password, ...rest } = input;
  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
};
