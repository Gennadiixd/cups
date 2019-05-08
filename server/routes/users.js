const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Task = require('../models/task')

const getUserTasks = async (activeTasks) => {
    let tasks = [];
    for (let i = 0; i < activeTasks.length; i++) {
        task = await Task.findOne ({_id : activeTasks[i]});
        tasks.push(task);
    }
    return tasks
}

router.get('/check', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
        let user = await User.findOne({email : req.session.user.email})
        let tasks = await getUserTasks(user.activeTasks)
        res.json({role : user.role, name : user.name, tasks : tasks})
    } else res.send('false')
})

router.get('/logout', async (req,res) => {
    if (req.cookies.user_sid && req.session.user) {
        req.session.destroy()
        res.clearCookie('user_sid');
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        let user = new User({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
            balance: 0,
            statistics: 0,
            activeTasks: []
        })
        await user.save()
        req.session.user = user;
        res.json({role: user.role})
    } catch (error) {res.status(400).send({message : 'Указанная почта уже используется'})}
});

router.post('/login', async (req,res,next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    let user = await User.findOne({email : req.body.email})
    if (user) {
        if (await user.comparePassword(req.body.password)) {
            let tasks = await getUserTasks(user.activeTasks)
            req.session.user = user;
            res.json({role : user.role, name : user.name, tasks : tasks});            
        } else res.status(400).send({message : 'Неверный пароль'})
    } else res.status(400).send({message : 'Пользователь не найден'})
})

module.exports = router;
