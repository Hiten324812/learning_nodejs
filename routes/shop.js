const path = require('path');
const express = require('express');
const admindata = require('../routes/admin');
const shopcontroller = require('../controllers/shop');
const isauth = require('../middleware/is-auth');


const router123 = express.Router();

router123.get('/', shopcontroller.getindex);
router123.get('/products',shopcontroller.getproducts);
router123.get('/products/:productid',shopcontroller.getproduct);
router123.get('/cart', isauth , shopcontroller.getcart);
router123.post('/cart', isauth , shopcontroller.postcart);
router123.post('/cart-delete-item', isauth ,shopcontroller.deletecartitem);
router123.post('/create-order', isauth , shopcontroller.getorder);
router123.get('/orders', isauth , shopcontroller.gotorder);


module.exports = router123;