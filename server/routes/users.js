const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/check', async (req, res) => {
    if (req.cookies.user_sid && req.session.user) {
    let user = await User.findOne({email : req.session.user.email})
        res.json({role : user.role, name : user.name})
    }
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
            role: 'not provided yet',
            balance: 0,
            statistics: 0,
            activeTasks: []
        })
        await user.save()
        req.session.user = user;
        res.json({role: user.role})
    } catch (error) {res.send({message : 'Email existed'})}
});

router.post('/login', async (req,res,next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    let user = await User.findOne({email : req.body.email})
    if (user) {
        if (await user.comparePassword(req.body.password)) {
            req.session.user = user;
            res.json({role : user.role, name : user.name})
        } else res.status(403).send({message : 'Wrong Password'})
    } else res.status(403).send({message : 'No such User'})
})

module.exports = router;
