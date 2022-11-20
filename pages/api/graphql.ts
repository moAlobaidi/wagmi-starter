import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";

import { DogsResolver } from "../../src/schema/dogs.resolver";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";

const schema = await buildSchema({
  resolvers: [DogsResolver],
  emitSchemaFile: true,
});

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(
  req: MicroRequest,
  res: ServerResponse<IncomingMessage>
) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
