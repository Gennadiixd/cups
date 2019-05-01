const express = require('express');
const router = express.Router();


router.get('/test', function(req, res, next) {
  res.send('connected');
});


router.get('/key', function(req, res, next) {  
  const fs = require('fs');
  let fileUrl = './APIkey.txt';
  let fromFile =  fs.readFileSync(fileUrl, "UTF-8",);
  res.send(fromFile);
});


module.exports = router;