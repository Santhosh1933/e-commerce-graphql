const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    imgUrl:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
