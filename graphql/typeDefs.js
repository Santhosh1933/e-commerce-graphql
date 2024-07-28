const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    address: Address
  }

  type Address {
    doorNo: Int
    city: String
    post: String
    taluk: String
    district: String
    pincode: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Shop {
    _id: ID
    name: String
    description: String
    email:String
    address: Address
  }

  type Category{
    _id:ID
    name:String
    shop:ID
    imgUrl:String
  }

  # Query

  type Query {
    users(start: Int, end: Int): [User]
    user: User
    shops: [Shop]
    shop(shopId:ID): Shop
    categories(start: Int, end: Int,shopId:ID):[Category]
  }

  # mutation

  input UserInput {
    name: String!
    email: String!
  }

  input AddressInput {
    doorNo: Int
    city: String
    post: String
    taluk: String
    district: String
    pincode: String
  }

  input ShopInput {
    name: String
    description: String
    email:String
    address: AddressInput
  }

  input CategoryInput{
    name:String
    shop:ID
    imgUrl:String
  }

  type Mutation {
    createUser(userInput: UserInput!): AuthPayload!
    updateAddress(addressInput: AddressInput!): User!
    createShop(shopDetails: ShopInput!): Shop!
    createCategory(categoryInput:CategoryInput!):Category!
  }
`;
