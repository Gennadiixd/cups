const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/signup', async (req, res, next) => {
    console.log(req.body)
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

module.exports = router;