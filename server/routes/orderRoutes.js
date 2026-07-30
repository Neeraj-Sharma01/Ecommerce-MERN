import express from "express";
import { createOrder, getOrderById, getUserOrders } from "../controllers/orderController.js";
import {protect} from "../middleware/authMiddleware.js"

const router  = express.Router();

router.post("/",protect,createOrder);
router.get("/",protect,getUserOrders);
router.get("/:id",protect,getOrderById);

export default router;