const express = require('express');
const router = express.Router();
const Task = require('./models/task');
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost/mysteryagent', function (err) {
    if (err) {
        console.log('err');        
    }
});

refresh = async () => {
    let user = await User.find();
    let tasks = await Task.find();

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].executor = "";
        await tasks[i].save();        
    }

    for (let i = 0; i < user.length; i++) {
        user[i].executor = "";
        user[i].activeTasks=[];
        await user[i].save();        
        console.log(user[i].activeTasks)
    }
    //console.log(user)
   
}

refresh();

//node refresh.js