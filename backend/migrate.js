import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import foodModel from './models/foodModel.js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

await mongoose.connect('mongodb+srv://vipul_gupta:food_app@cluster0.yiptjmv.mongodb.net/food_delivery_app');
console.log("DB connected");

const foods = await foodModel.find({});

for (const food of foods) {
    const localPath = path.join('uploads', food.image);
    
    if (fs.existsSync(localPath)) {
        console.log(`Uploading: ${food.image}`);
        const result = await cloudinary.uploader.upload(localPath, {
            folder: 'food-delivery'
        });
        food.image = result.secure_url;
        await food.save();
        console.log(`Updated: ${food.name} -> ${result.secure_url}`);
    } else {
        console.log(`File not found: ${localPath}`);
    }
}

console.log("Migration done!");
process.exit(0);