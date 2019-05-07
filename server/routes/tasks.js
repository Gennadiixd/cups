const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose');
const User = require('../models/user')

router.get('/getall', async function (req, res, next) {
  let tasks = await Task.find()
  let tasksFiltered = tasks.filter(tasks => tasks.expDate > new Date());
  tasksFiltered = tasks.filter(tasks => tasks.executor === "");
  //console.log(tasksFiltered);
  res.send(tasksFiltered);
});

router.post('/take', async function (req, res) {
  console.log('=================================')
  console.log(req.body.taskId, req.body.userName);


  if (req.body.userName) {
    if (req.body.taskId) {
      let task = await Task.findOne({ _id: req.body.taskId });
      //console.log(task);
      task.executor = req.body.userName;
      await task.save();
    }
    
    let multipleTaskFlag = false;
    let user = await User.find({ name: req.body.userName });
    tasksArray = user[0].activeTasks;

    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i] == req.body.taskId) {
        multipleTaskFlag = true;
      }
    }

    if (!multipleTaskFlag) {
      user = await User.findOneAndUpdate({ name: req.body.userName }, { $push: { activeTasks: req.body.taskId } });
      res.send(req.body.taskId);
    } else {
      res.send('empty')
    }
  }
  else {
    res.send('empty')
  }
})

router.post('/savetask', async function (req, res, next) {
  //console.log(req.body);
  let task = new Task({
    title: req.body.title,
    adress: [req.body.arrayWithCoordinates],
    description: req.body.description,
    expDate: req.body.expDate,
    executer: '',
  })
  await task.save();
  //console.log(task)
  res.send(task._id);
});

module.exports = router;