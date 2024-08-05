import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// types
import { typeDefs } from "./schema";
// server setup
const server = new ApolloServer({
  // typeDefs => definition of types of data
  typeDefs,
  // resolvers
});
const port = 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log("server ready at port", port);
