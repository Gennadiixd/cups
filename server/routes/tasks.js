const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/getall', function(req, res, next) {
  console.log('all');  
  res.send('all');
});

router.get('/savetask', async function(req, res, next) {
  let date = new Date();

  const task = new Task({
    title :"TestTask",
    text : "TestDescription",
    address : {type : String, required : true},
    price : 100500,
    due : date,
    status : "notDone",
  })
  await task.save();
  console.log('all');  
  res.send('all');
});

module.exports = router;