import { FastifyReply, FastifyRequest } from "fastify";
import { createProduct, getProducts } from "./product.service";
import { CreateProductInput } from "./product.schema";

export const createProductHandler = async (
  req: FastifyRequest<{ Body: CreateProductInput }>,
  rep: FastifyReply
) => {
  const body = req.body;
  try {
    const product = await createProduct({ ...body, ownerId: req.user.id });
    rep.code(201).send(product);
  } catch (error) {
    return rep.code(500).send(error);
  }
};

export const getProductHandler = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {};

export const getProductsHandler = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  const products = await getProducts();
  return rep.status(200).send(products);
};
