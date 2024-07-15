const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    todo: String,
    showEdit: Boolean,
    completed: Boolean,
})

module.exports = mongoose.model("todo", todoSchema)