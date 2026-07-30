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

         const orderItems = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
         }));

         const totalItems = card.items.reduce((total,item) => {
            return total + item.product.price*item.quantity
         },0)

         const order = await Order.create({
            user:req.user._id,
            items:orderItems,
            totalAmount
         })

         for(const item of cart.items)
         {
            item.product.stock -= item.quantity;
            await item.product.save();
         }

         cart.items = [];

         await cart.save();

        res.status(200).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
            });
    }
}

export const getUserOrders = async(req,res) => {
    try {
            const orders = await Order.find({
                user:req.user._id,
            }).populate("items.product").sort({createdAt:-1})

            res.status(200).json({
                success:true,
                count:order.length,
                orders
            })

    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
}

export const getOrderById = async(req,res) => {
    try {
        const {id} = req.parms;

        const order = await Order.findById(id).populate("items.product").populate("user","name email");

         if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
            }
        
        if (order.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
            }

             res.status(200).json({
                success: true,
                order,
                });

    } catch (error) {
             res.status(200).json({
                success: true,
                order,
                });
    }
}