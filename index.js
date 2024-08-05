import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// types
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args) {
      // 3 => first => parent second => args third is context
      return db.reviews.find((review) => review.id === args.id);
      //   example query  for fetch
      // query reviewQuery( $id: ID!) {
      //     review(id: $id) {
      //       content,
      //       id,
      //       rating

      //     }
      //     }
    },

    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
};
// server setup
const server = new ApolloServer({
  // typeDefs => definition of types of data
  typeDefs,
  resolvers,
});
const port = 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port },
});

console.log("server ready at port", port);
