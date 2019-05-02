const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose');;

router.get('/getall', async function(req, res, next) {
  let tasks = await Task.find()
  console.log(tasks);  
  res.send(tasks);
});

router.get('/savetask', async function(req, res, next) {
  let task = new Task({
    title : "TestTask",
    adress : [[55.684758, 37.538521]],
    reducerId : 1,
    description: "JavaScript API поможет встроить на сайт или в приложение карту с поиском по топонимам и организациям, с возможностью строить маршруты и смотреть панорамы, а также с другими функциями, доступными на Яндекс.Картах."
  })
  await task.save();
  // let date = new Date();
  // const task = new Task({
  //   title :"TestTask",
  //   text : "TestDescription",
  //   address : {type : String, required : true},
  //   price : 100500,
  //   due : date,
  //   status : "notDone",
  // })
  // await task.save();
  console.log('all');  
  res.send('all');
});

module.exports = router;