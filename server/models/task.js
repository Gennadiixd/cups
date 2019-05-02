const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title : String,
  adress : Array,
  reducerId : 0,
  description: String,
})

module.exports = mongoose.model('Task', taskSchema)
