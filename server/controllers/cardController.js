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