const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Task = require('../models/task')

//Получение подробных данных о всех активных заданиях пользователя
const getUserTasks = async (user) => {
    return user.role==='worker' ? await Task.find({executor : user.name}) : await Task.find({author : user.name})
}

//Проверка на наличие сессии текущего пользователя
router.get('/check', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
        let user = await User.findOne({ email: req.session.user.email })
        let tasks = await getUserTasks(req.session.user)
        res.json({ user: user, tasks: tasks })
    } else { res.send('false') }
})

//Выход пользователя из сессии
router.get('/logout', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
        req.session.destroy()
    }
    res.status(200).send('Logged out')
})

//Регистрация пользователя
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
        res.json(user)
    } catch (error) { res.status(400).send({ message: 'Указанные ник или почта уже используются' }) }
});

//Вход пользователя
router.post('/login', async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        if (await user.comparePassword(req.body.password)) {
            req.session.user = user;
            let tasks = await getUserTasks(req.session.user)
            delete user._doc.password;
            res.json({ user: user, tasks: tasks });
        } else res.status(400).send({ message: 'Неверный пароль' })
    } else res.status(400).send({ message: 'Пользователь не найден' })
})

router.get('/profile', async (req, res) => {
    let user = await User.findOne({ name: req.params.userName });
    res.json(user);
});

router.post('/:name', async (req, res) => {
    // if (req.body.role === 'author') {
        // let activeByAuthor = await Task.find({author: req.params.name, status: 'active'});
        // let completedByAuthor = await Task.find({author: req.params.name, status: 'completed'});
        let tasksByAuthor = await Task.find({author: req.params.name});
        res.json(tasksByAuthor);
        // res.json({active: activeByAuthor, completed: completedByAuthor});
    // } else {
    //     let completedByExecutor = await Task.find({ executor: req.params.name, status: 'completed' });
    //     res.json(completedByExecutor);
    // }
});

module.exports = router;
