const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: String,
  status: { type: String, default: "pending" },
  due_date: Date,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", taskSchema);
