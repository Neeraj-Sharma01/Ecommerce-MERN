import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

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

const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})