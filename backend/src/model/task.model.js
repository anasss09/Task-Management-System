import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: "pending"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;