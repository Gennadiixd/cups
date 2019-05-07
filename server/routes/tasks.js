const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose');
const User = require('../models/user')

//Вывод всех заданий кроме с истёкшей датой(expDate) и тех которые уже кем-то взяты (executor не пустой)
router.get('/getall', async function (req, res, next) {
  let tasks = await Task.find()
  let tasksFiltered = tasks.filter(tasks => tasks.expDate > new Date());
  tasksFiltered = tasks.filter(tasks => tasks.executor === "");
  //console.log(tasksFiltered);
  res.send(tasksFiltered);
});


//      Логика присовения задания 
router.post('/take', async function (req, res) {
  // console.log('=================================');
  // console.log(req.body.taskId, req.body.userName);

  //Находим задание по id, присваеваем ему пользователя(исполнителя), пушим в ActiveTasks пользователю(исполнителю) id задания.
  //Если в базе нет пользователя/задания шлём на фронт empty, он разберётся.
  if (req.body.userName) {
    
    if (req.body.taskId) {
      let task = await Task.findOne({ _id: req.body.taskId });
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

//      Логика сохранения задания
router.post('/savetask', async function (req, res, next) {  
  let task = new Task({
    title: req.body.title,
    adress: [req.body.arrayWithCoordinates],
    description: req.body.description,
    expDate: req.body.expDate,
    executor: '',
  })
  await task.save();
  res.send(task._id);
});

module.exports = router;