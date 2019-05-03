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
  const fs = require('fs');
  let fileUrl = './APIkey.txt';
  let APIkey = fs.readFileSync(fileUrl, "UTF-8");
  let adress = encodeURIComponent("Москва " + req.body.adress);
  let resp = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${APIkey}&format=json&geocode=${adress}`)
  let data = await resp.json();
  let coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
  coordinates = coordinates.split(' ')
  console.log(coordinates)
  let long = Number(coordinates[0]);
  let lat = Number(coordinates[1])
  let arrayWithCoordinates = [lat, long];
  console.log(arrayWithCoordinates);

  let task = new Task({
    title: req.body.title,
    adress: [arrayWithCoordinates],
    description: req.body.description,
    expDate: req.body.expDate,
  })
  await task.save();
  res.send('all');
});

module.exports = router;