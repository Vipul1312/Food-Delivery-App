import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vipul_gupta:food_app@cluster0.yiptjmv.mongodb.net/food_delivery_app').then(()=>console.log("DB connected"));
}