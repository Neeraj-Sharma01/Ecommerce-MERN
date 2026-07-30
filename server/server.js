import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import  authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cardRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();

//connect Database
connectDB()

//Middleware
app.use(cors())
app.use(express.json())

//Route
app.get("/",(req,res) => {
    res.send("E-commerce API is runnning...")
})

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cardRoutes);
app.use("/api/orders",orderRoutes);
const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})