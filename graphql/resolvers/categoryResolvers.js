const { ApolloError } = require("apollo-server");
const Category = require("../../models/Category");

module.exports = {
  Query: {
    async categories(_, { start, end, shopId }) {
      return await Category.find({ shop: shopId })
        .skip(start)
        .limit(end - start);
    },
  },
  Mutation: {
    async createCategory(_, { categoryInput }) {
      try {
        const newCategory = new Category({
          ...categoryInput,
        });
        return await newCategory.save();
      } catch (error) {
        throw new ApolloError("Error in category Creation :- ", error);
      }
    },
  },
};
