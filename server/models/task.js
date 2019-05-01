const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title : {type : String, required : true},
  text : {type : String, required : true},
  address : {type : String, required : true},
  price : {type : Number, required : true},
  due : {type : Date, required : true},
  status : {type : String, required : true},
})

module.exports = mongoose.model('Task', taskSchema)
