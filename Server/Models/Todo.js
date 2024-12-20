const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    content: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deadline: { type: Date },
    userId: { type: mongoose.Schema.Types.UUID, required: true }
})

const TodoModel = mongoose.model("todos",TodoSchema)
module.exports = TodoModel