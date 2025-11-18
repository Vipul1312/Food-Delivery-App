import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item
const addFood = async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true,message: "food added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood = async(req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true , data:foods})
    } catch (error) {
        console.log(error);
        res.json({success: false , message:"Error"})
    }
}

// remove food
// const removeFood = async(req,res)=>{
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`,()=>{})

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({success: true , message : "food removed"})
//     } catch (error) {
//         console.log(error);
//         res.json({success: false , message : "Error"})
//     }
// }


const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) {
        console.log("Image deletion error:", err);
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log("Remove food error:", error);
    res.json({ success: false, message: "Error" });
    console.log("req.body:", req.body);
  }
};

export {addFood,listFood,removeFood}