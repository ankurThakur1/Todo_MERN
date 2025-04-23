const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        rqeuired: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
module.exports = Todo;