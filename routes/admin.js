const path = require('path');
const express = require('express');


const admincontroller = require('../controllers/admin');

const router = express.Router();


router.get( '/add-product',admincontroller.getaddproduct); 
router.get('/products',admincontroller.getproducts);
router.post('/add-product',admincontroller.postaddproduct);



module.exports = router;


 