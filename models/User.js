const { Schema, model } = require("mongoose");

const userAddress = new Schema({
  doorNo: {
    type: Number,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  post: {
    type: String,
    required: true,
    trim: true,
  },
  taluk: {
    type: String,
    required: true,
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
});
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: userAddress,
});

const User = model("User", userSchema);

module.exports = User;
