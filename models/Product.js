const mongoose = require("mongoose");
const { Schema } = mongoose;
const slugify = require("slugify");

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  features: [
    {
      Title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", async function (next) {
  const product = this;
  if (product.isModified("name")) {
    let slug = slugify(product.name, { lower: true, strict: true });
    let slugExists = await mongoose.models.Product.findOne({ slug });
    let counter = 1;
    while (slugExists) {
      slug = `${slugify(product.name, { lower: true, strict: true })}-${counter}`;
      slugExists = await mongoose.models.Product.findOne({ slug });
      counter++;
    }
    product.slug = slug;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
