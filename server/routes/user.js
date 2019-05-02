const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/signup', async (req, res, next) => {
    let user = new User({
        name : req.body.name,
        password : req.body.password,
        email : req.body.email,
        role : 'not provided yet',
        balance : 0,
        statistics: 0,
        activeTasks: []
    })
    await user.save()
    res.send('success')
});

router.post('/login', async (req,res,next) => {
    let user = await User.findOne({email : req.body.email})
    if (user) {
        if (req.body.password===user.password) {
            res.send('Logged in')
        } else res.send('Wrong Password')
    } else res.send('No such User')
})

module.exports = router;