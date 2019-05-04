const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    res.json(user);
});

module.exports = router;