const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  coordinates: Array,
  reducerId: Number,
  description: String,
  expDate: Date,
  executor: String,
  completed: Boolean,
  author: String,
})

module.exports = mongoose.model('Task', taskSchema)
