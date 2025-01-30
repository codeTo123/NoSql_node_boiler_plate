import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Fixed
    },
    exp_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deleted_at: {
        type: Date,
        default: null,
    },
},
    {
        timestamps: false,
        underscored: true
    })
const Product = mongoose.model("Product", ProductSchema)
export default Product