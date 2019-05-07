const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Task = require('../models/task')

router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    res.json(user);
});

router.post('/signup', async (req, res, next) => {
    try {
        let user = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            role: 'not provided yet',
            balance: 0,
            statistics: 0,
            activeTasks: []
        })
        await user.save()
        res.json({role: user.role})
    } catch (error) {res.send({message : 'Email existed'})}
});

router.post('/login', async (req,res,next) => {
    console.log(req.body)
    let user = await User.findOne({email : req.body.email})
    if (user) {
        if (await user.comparePassword(req.body.password)) {
            let tasks = [];
            for (let i = 0; i < user.activeTasks.length; i++) {              
                 task = await Task.findOne ({_id : user.activeTasks[i]});
                 tasks.push(task);
            }    
            res.json({role : user.role, name : user.name, tasks : tasks})
        } else res.status(403).send({message : 'Wrong Password'})
    } else res.status(403).send({message : 'No such User'})
})

module.exports = router;