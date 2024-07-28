const { ApolloError } = require("apollo-server");
const Shop = require("../../models/Shop");
const authenticateToken = require("../../middlewares/authenticateToken");

module.exports = {
  Query: {
    async shops(_) {
      return await Shop.find();
    },
    async shop(_,{shopId}) {
      return await Shop.findById(shopId);
    },
  },
  Mutation: {
    async createShop(_,{shopDetails}){
        try {
            const newShop = new Shop({
                ...shopDetails
            })
            return await newShop.save()
        } catch (error) {
            throw new ApolloError("Error creating Shop :- ", error);
        }
    }
  },
};
