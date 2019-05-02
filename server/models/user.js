const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name : {type : String, required : true},
  password : {type : String, required : true},
  email : {type : String, required : true, unique : true},
  role : {type : String, required : true},
  balance : {type : Number, required : true},
  statistics : {type : Number, required : true},
  activeTasks : {type : Array}
})

module.exports = mongoose.model('User', userSchema)
