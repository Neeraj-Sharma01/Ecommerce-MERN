import Cart from "../models/Cart.js";
import Product from "../models/product.js";

export const addToCart = async(req,res) => {
    try {
        const {productId,quantity=1} = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
            }

     let cart = await Cart.findOne({
      user: req.user._id,
    });

     if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

     if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({
        product: productId,
        quantity: Number(quantity),
      });
    }

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });

    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export const getcart = async(req,res) => {
    try {
        const cart = await Cart.findOne({
            user:req.user._id
        }).populate("items.product");

         if (!cart) {
            return res.status(200).json({
                success: true,
                items: [],
                totalItems: 0,
                subtotal: 0,
            });
        }

        let subtotal = 0;

        cart.items.forEach((item) => {
            subtotal += item.product.price * item.quantity
        })

        res.status(200).json({
      success: true,
      items: cart.items,
      totalItems: cart.items.length,
      subtotal,
    });
    } catch (error) {
        res.status(500).json({
      success: false,
      message: error.message,
    });
    }
}

export const updateCartItem = async(req,res) => {
    try {
        const {productId,quantity} = req.body;

        const cart = await Cart.findOne({
            user:req.user._id
        })

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const item = cart.items.find((item) => item.product.toString() === productId);

         if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
            }
        
        if (quantity <= 0) {
            cart.items = cart.items.filter(
                (item) => item.product.toString() !== productId
            );
            } else {
            item.quantity = Number(quantity);
            }

         await cart.save();

            await cart.populate("items.product");

            let subtotal = 0;

            cart.items.forEach((item) => {
            subtotal += item.product.price * item.quantity;
            });

            res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            items: cart.items,
            subtotal,
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            });
    }
}