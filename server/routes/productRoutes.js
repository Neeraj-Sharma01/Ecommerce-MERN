import express from  "express";
import { createProduct,getProducts,getProductsById,updateProduct,deleteProduct } from "../controllers/productController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",getProducts);
router.get("/:id",getProductsById);
router.post("/",protect,admin,createProduct);
router.put("/:id",protect,admin,updateProduct);
router.delete("/:id",protect,admin,deleteProduct);

export default router;