import Product from "../models/product.js";
export const createProduct = async (req, res) => {
    try {
        console.log("Request reached createProduct");
        console.log(req.body);
        const{title,description,price,category,brand,stock,images} = req.body;
        if (!title || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }
        const product = await Product.create({
            title,
            description,
            price,
            category,
            brand,
            stock,
            images,
            createdBy:req.user._id,
        })

        res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
    });
}
catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
    });
    }
};

export const getProducts = async (req,res) => {
    try {
        const products = await Product.find().sort({createdAt: -1,});
        res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
    } catch (error) {
         res.status(500).json({
      success: false,
      message: error.message,
    }); 
    }
}