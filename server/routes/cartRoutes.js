import express from "express";
import { addToCart, getcart,updateCartItem } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect,addToCart);
router.get("/",protect,getcart);
router.put("/",protect,updateCartItem);

export default router;