import express from 'express'
import dotenv from "dotenv"
dotenv.config();
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from "cors"
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

let port = process.env.PORT || 5001;


let app = express();
app.use(cookieParser())
app.use(cors({
    origin: ["https://ecart-frontend-mzdr.onrender.com", "http://localhost:5174"],
    credentials:true
}))

app.use(express.json())



app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)




app.listen(port, () => {
    console.log(`hello form server port- ${port}`)
    connectDb()
})
