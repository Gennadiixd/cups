const mongoose = require("mongoose");
const moment = require('moment');

const taskSchema = new mongoose.Schema({
  title: String,
  coordinates: Array,
  reducerId: Number,
  description: String,
  expDate: Date,
  executor: String,
  completed: Boolean,
  author: String,
  prettyDate: String
})
taskSchema.virtual('date')
  .get(function () {
    moment.locale('ru');
    return moment(this.expDate).format('LT');
  });

module.exports = mongoose.model('Task', taskSchema)
