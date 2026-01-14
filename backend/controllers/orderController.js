import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();    


const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});



export async function placeOrder(req, res) {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new Order(orderData);
        await newOrder.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
}

export const userOrders = async(req,res) => {
    try {
        const userId = req.userId; 
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "userOrders error "})
    }
}


// for admin to get all orders

export const allOrders = async(req,res) => {
    try {
        const orders = await Order.find({})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "allOrders error "})
    }
}

export const updateOrderStatus = async(req,res) => {
    try {
        const {orderId, status} =req.body
        await Order.findByIdAndUpdate(orderId, {status})
        return res.status(200).json({message: "Order status updated"})
    } catch (error) {
        return res.status(500).json({message: "updateOrderStatus error "})
    }
}


export const placeOrderRazorPay = async(req,res) => {
    try {
        const {items, amount , address} = req.body; 
        const userId = req.userId; 
        const orderData = {
            items, 
            amount, 
            address, 
            userId,
            paymentMethod: "RazorPay",
            payment: false, 
            date: Date.now(),
        }

        const newOrder = new Order(orderData);
        await newOrder.save(); 

        const options = {
            amount: Number(amount) * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: newOrder._id.toString(),   
        }

        // const order = razorpayInstance.orders.create(options, (err, order)  => {
        //     if(err) {
        //         return res.status(500).json({message: "Razorpay order creation failed", error: err})
        //     }
        //     res.status(201).json({
        //         message: "Razorpay order created successfully",
        //         orderId: newOrder._id,
        //         razorpayOrderId: order.id,
        //         amount: order.amount,
        //         currency: order.currency,
        //     })
        // })

        const razorpayOrder = await razorpayInstance.orders.create(options);

return res.status(201).json({
    message: "Razorpay order created successfully",
    orderId: newOrder._id,
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
});


    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error placing Razorpay order", error: error.message})
    }
}


export const verifyRazorpay = async(req,res) => {
    try {
         const userId = req.userId;
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        console.log(orderInfo)

        if(orderInfo.status === "paid"){
            await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await User.findByIdAndUpdate(userId, { cartData:{} });
            return res.status(200).json({ message: "Payment verified successfully" });
        }else{
            return res.status(400).json({ message: "Payment verification failed" });
        }

    } catch (error) {
        console.log(error)

    }
}
