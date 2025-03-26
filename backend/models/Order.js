import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:true
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "Books",
      required:true
    },
    quantity:{
      type:Number,
      default:1

    },
    status: {
      type: String,
      default: "Order placed",
      enum: ["Order placed", "Out for delivery", "Delivered", "Canceled"],
    },
   
    
    
    
  },
  { timestamps: true }  
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
