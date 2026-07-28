import express from  "express";
import { createProduct,getProducts,getProductsById } from "../controllers/productController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",getProducts);
router.post("/",protect,admin,createProduct);
router.get("/:id",getProductsById);

export default router;