const path = require('path');
const express = require('express');
const rootdir = require('../util/path');


const router123 = express.Router();

router123.get('/',(req,res,next) => {

   res.sendFile(path.join(rootdir ,'views','shop.html'));
    // ..
});

module.exports = router123;