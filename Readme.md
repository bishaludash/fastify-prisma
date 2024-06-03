### Dependencies Setup

- yarn add @prisma/client fastify fastify-zod zod-to-json-schema fastify-jwt

### Dev Dependencies

- yarn add ts-node-dev typescript @types/node --dev
- [Typescript Installation Guide](https://www.digitalocean.com/community/tutorials/typescript-new-project)

### Initialize Prisma

- npx prisma init --datasource-provider mysql
- Run **npx prisma db pull** to turn your database schema into a Prisma schema.
- Run **npx prisma generate** to generate the Prisma Client. You can then start querying your database.

### Migrate the schema

- npx prisma migrate dev --name init
