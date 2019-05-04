const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title : String,
  adress : Array,
  reducerId : Number,
  description: String,
  expDate: Date,
})

module.exports = mongoose.model('Task', taskSchema)
