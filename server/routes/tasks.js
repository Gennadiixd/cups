const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose');
const User = require('../models/user');
const moment = require('moment');
const upload = require('../upload')

//Вывод всех заданий кроме с истёкшей датой(expDate) и тех которые уже кем-то взяты (executor не пустой)
router.get('/getall', async function (req, res, next) {
  if (!req.session.user) {
    res.send({ message: "unauthorized" })
    return;
  } else if (req.session.user.role === 'worker') {
    var tasksFiltered = await Task.find({ executor: "" })
  } else if (req.session.user.role === 'author') {
    var tasksFiltered = await Task.find({ author: req.session.user.name })
  } else {
    res.send({ message: "Something broke!" })
    return;
  }
  tasksFiltered = tasksFiltered.filter(task => task.expDate > new Date());
  res.send(tasksFiltered);
});

//      Логика присовения задания 
router.post('/take', async function (req, res) {
  //Находим задание по id, присваеваем ему пользователя(исполнителя), пушим в ActiveTasks пользователю(исполнителю) id задания.
  //Если в базе нет пользователя/задания шлём на фронт empty, он разберётся.
  if (req.body.userName && req.body.taskId) {
    let multipleTaskFlag = true;
    let user = await User.find({ name: req.body.userName });
    tasksArray = user[0].activeTasks;

    for (let i = 0; i < tasksArray.length; i++) {
      if (tasksArray[i] == req.body.taskId) {
        multipleTaskFlag = false;
      }
    }

    if (multipleTaskFlag) {
      let task = await Task.findOne({ _id: req.body.taskId })
      task.executor = req.body.userName;
      await task.save();
      user = await User.findOneAndUpdate({ name: req.body.userName }, { $push: { activeTasks: req.body.taskId } });
      console.log(task, req.body.taskId)
      res.send({ respond: 'full', taskID: req.body.taskId, task: task });
    } else {
      res.send({ respond: 'empty' })
    }
  }
  else {
    res.send({ respond: 'empty' })
  }
})

//      Логика сохранения задания
router.post('/savetask', async function (req, res, next) {
  let task = new Task({
    title: req.body.title,
    coordinates: [req.body.arrayWithCoordinates],
    description: req.body.description,
    expDate: req.body.expDate,
    executor: '',
    author: req.body.author,
    status: 'active',
    prettyDate: moment(req.body.expDate).format('llll'),
  })
  await task.save();
  res.send({ id: task._id });
});


//router.post('/send', async (req, res) => {//исполнитель отправляет задание на проверку заказчику
  //let task = await Task.findByIdAndUpdate(req.body.id, { status: 'pending' });
  //res.send();

router.post('/complete', async (req, res) => {
  console.log(req.body.report)
  let task = await Task.findByIdAndUpdate(req.body.id, { status: 'pending' , report : req.body.report});
  res.send(task);
})


router.post('/upload', upload)

//      Отказ от задания
router.delete('/discardtask', async (req, res) => {
  let taskId = req.body.id;
  let userId = req.session.user._id
  await Task.findByIdAndUpdate(taskId, { "executor": '' })
  await User.findByIdAndUpdate(userId, { $pull: { activeTasks: taskId } });
  res.send('success')
})
router.put('/:id', async (req, res) => {
  console.log(req.params.id);
  await Task.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.send();
})

module.exports = router;