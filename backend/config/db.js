import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connected successfullly")
    } catch (error) {
        console.log("database connection error")
    }
}

export default connectDb;