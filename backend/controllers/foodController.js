import foodModel from "../models/foodModel.js";
import { v2 as cloudinary } from 'cloudinary';

// add food item
const addFood = async (req, res) => {
    let image_url = req.file.path; // Cloudinary full URL

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_url
    })
    try {
        await food.save();
        res.json({ success: true, message: "food added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Cloudinary se delete karo
        if (food.image) {
            const publicId = food.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`food-delivery/${publicId}`);
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.log("Remove food error:", error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood }