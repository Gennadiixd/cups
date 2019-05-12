const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  coordinates: Array,
  reducerId: Number,
  description: String,
  expDate: Date,
  prettyDate: String,
  executor: String,
  status: String, //completed, pending, declined, active
  author: String,
  report: String,
})

module.exports = mongoose.model('Task', taskSchema);
