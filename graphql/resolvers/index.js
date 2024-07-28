const categoryResolvers = require("./categoryResolvers");
const shopResolver = require("./shopResolver");
const userResolver = require("./userResolver");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...shopResolver.Query,
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...shopResolver.Mutation,
    ...categoryResolvers.Mutation,
  },
};
