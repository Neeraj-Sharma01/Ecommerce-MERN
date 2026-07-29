import Cart from "../models/Cart.js";
import Product from "../models/product.js";
import Order from "../models/Order.js";

export const createOrder = async(req,res) => {
    try {
        const  cart = await Cart.findOne({
            user:req.user._id
        }).populate("items.product")

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
         }

        for (const item of cart.items) {

        if (item.product.stock < item.quantity) {
            return res.status(400).json({
            success: false,
            message: `Not enough stock for ${item.product.title}`,
            });
        }
         }

        res.status(200).json({
            success: true,
            message: "Cart validated successfully",
            cart,
        });

    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
            });
    }
}