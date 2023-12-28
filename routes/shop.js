const path = require('path');
const express = require('express');
const rootdir = require('../util/path');
const admindata = require('../routes/admin');


const router123 = express.Router();

router123.get('/',(req,res,next) => {
    const products = admindata.products;
    res.render('shop',{prods : products , pageTitle : 'shop flipkart' , path : '/' , hasproduct : products.length > 0});
    // ..
});

module.exports.routes = router123;