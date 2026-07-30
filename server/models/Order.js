import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            
            quantity:{
                type:Number,
                required:true
            },

            price:{
                type:Number,
                required:true
            }
        }
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD",
        },

    paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
    },

     status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
},
{
    timestamps:true
}
)

export default mongoose.model("Order",orderSchema);