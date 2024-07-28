require('dotenv').config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const MONGODB = "mongodb://localhost:27017/e-commerce-graphql";
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), 
});

mongoose
  .connect(MONGODB)
  .then(() => {
    console.log("MongoDb connection established");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(res.url);
  });
