import express from  "express";
import { createProduct } from "../controllers/productController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect,admin,createProduct);

export default router;