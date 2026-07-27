import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
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
    },

    brand: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    images: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },
},
{
    timestamps: true,
}
)

const Product = mongoose.model("Product",productSchema);

export default Product;