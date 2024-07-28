const { ApolloError } = require("apollo-server");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../../middlewares/authenticateToken");

const JWT_SECRET = process.env.JWT_KEY;

module.exports = {
  Query: {
    async users(_, { start, end }) {
      try {
        return await User.find()
          .skip(start)
          .limit(end - start);
      } catch (error) {
        throw new ApolloError("Server Error: ", error);
      }
    },

    async user(_,__,context){
      try {
        const decodedToken = authenticateToken(context);
        return await User.findById(decodedToken.userId)
      } catch (error) {
        throw new ApolloError("Server Error: ", error);
      }
    }

  },

  Mutation: {
    async createUser(_, { userInput }) {
      try {
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
          const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
          return {
            token,
            user: existingUser,
          };
        } else {
          const newUser = new User({
            name: userInput.name,
            email: userInput.email,
          });
          const savedUser = await newUser.save();
          const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET);
          return {
            token,
            user: savedUser,
          };
        }
      } catch (error) {
        throw new ApolloError("Error creating user: ", error);
      }
    },

    async updateAddress(_, { addressInput }, context) {
      const decodedToken = authenticateToken(context);

      try {
        const updatedUser = await User.findByIdAndUpdate(
          decodedToken.userId,
          { address: addressInput },
          { new: true }
        );

        if (!updatedUser) {
          throw new ApolloError("User not found");
        }

        return updatedUser;
      } catch (error) {
        throw new ApolloError("Error updating address: ", error);
      }
    },
  },
};
