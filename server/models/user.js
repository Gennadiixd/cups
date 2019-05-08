const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name : {type : String, required : true, unique: true},
  password : {type : String, required : true},
  email : {type : String, required : true, unique : true},
  role : {type : String, required : true},
  balance : {type : Number, required : true},
  statistics : {type : Number, required : true},
  activeTasks : {type : Array}
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema)
