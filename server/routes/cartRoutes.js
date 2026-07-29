import express from "express";
import { addToCart, getcart,removeCartItem,updateCartItem } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect,addToCart);
router.get("/",protect,getcart);
router.put("/",protect,updateCartItem);
router.delete("/:productId",protect,removeCartItem);

export default router;