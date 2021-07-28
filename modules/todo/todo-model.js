const { string } = require("joi");
const mongoose = require("mongoose");
const ToDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  toDoDetail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Todo", ToDoSchema);
