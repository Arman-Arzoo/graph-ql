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

  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((g) => g.id === parent.id);
    },
    author(parent) {
      return db.authors.find((a) => a.id === parent.id);
    },
  },

  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);
      return game;
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
