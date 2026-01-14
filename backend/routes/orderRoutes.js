import express from 'express';
import {allOrders, placeOrder, placeOrderRazorPay, updateOrderStatus, userOrders, verifyRazorpay} from '../controllers/orderController.js';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRoutes = express.Router();

//for user to place order
orderRoutes.post("/placeorder", isAuth, placeOrder)
orderRoutes.post("/userorders", isAuth, userOrders)
orderRoutes.post("/razorpay", isAuth, placeOrderRazorPay)
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay)

//for admin to get all orders
orderRoutes.post("/list", adminAuth, allOrders)
orderRoutes.post("/updateorderstatus", adminAuth, updateOrderStatus)

export default orderRoutes;