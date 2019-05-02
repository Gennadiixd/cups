const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose');;

router.get('/getall', async function(req, res, next) {
  let tasks = await Task.find()    
  let tasksFiltered = tasks.filter(tasks => tasks.expDate > new Date());
  console.log(tasksFiltered);  
  res.send(tasksFiltered);
});

router.get('/savetask', async function(req, res, next) {
  let task = new Task({
    title : "TestTask",
    adress : [[55.684758, 33.538521]],
    reducerId : 1,
    description: "JavaScript API поможет встроить на сайт или в приложение карту с поиском по топонимам и организациям, с возможностью строить маршруты и смотреть панорамы, а также с другими функциями, доступными на Яндекс.Картах.",
    expDate: '2019-05-26 11:11:00.000'
  })
  await task.save();
  res.send('all');
});

module.exports = router;