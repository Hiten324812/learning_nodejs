const path = require('path');
const express = require('express');


const admincontroller = require('../controllers/admin');

const router = express.Router();


router.get( '/add-product',admincontroller.getaddproduct); 
router.get('/products',admincontroller.getproducts);
router.post('/add-product',admincontroller.postaddproduct);
router.get('/edit-product/:productid',admincontroller.geteditproduct);
router.post('/edit-product',admincontroller.posteditproduct);
router.post('/delete-product',admincontroller.deleteproduct);


module.exports = router;


 