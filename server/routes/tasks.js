const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

router.get('/getall', async function (req, res, next) {
  let tasks = await Task.find()
  let tasksFiltered = tasks.filter(tasks => tasks.expDate > new Date());
  console.log(tasksFiltered);
  res.send(tasksFiltered);
});

router.post('/savetask', async function (req, res, next) {
  console.log(req.body);
  let task = new Task({
    title: req.body.title,
    adress: [req.body.arrayWithCoordinates],
    description: req.body.description,
    expDate: req.body.expDate,
  })
  await task.save();
  console.log(task)
  res.send(task._id);
});

module.exports = router;