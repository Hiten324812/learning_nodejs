const path = require('path');
const express = require('express');
const admindata = require('../routes/admin');
const shopcontroller = require('../controllers/shop');


const router123 = express.Router();

router123.get('/', shopcontroller.getindex);
router123.get('/products',shopcontroller.getproducts);
router123.get('/products/:productid',shopcontroller.getproduct);
router123.get('/cart',shopcontroller.getcart);
router123.post('/cart',shopcontroller.postcart);
router123.post('/cart-delete-item',shopcontroller.deletecartitem);
router123.post('/create-order',shopcontroller.getorder);
router123.get('/orders',shopcontroller.gotorder);


module.exports = router123;