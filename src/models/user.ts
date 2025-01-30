import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Email validation regex
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "seller"],
            default: "user",
        },
        profile_image: {
            type: String
        },
        hobbies: {
            type: [String], // Array of strings
            default: [],
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        deleted_at: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: false,
        underscored: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
