const mongoose = require("mongoose");
const { Schema } = mongoose;

const shopAddress = new Schema({
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
const shopSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: shopAddress,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
