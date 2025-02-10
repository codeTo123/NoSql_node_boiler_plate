import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Fixed
    },
    due_date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
        default: 'medium'
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
const Task = mongoose.model("Task", TaskSchema)
export default Task