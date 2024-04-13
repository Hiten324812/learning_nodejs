const express = require('express');
const authcontroller = require('../controllers/auth');

const router456 = express.Router();

router456.get('/login', authcontroller.getlogin);
router456.post('/login',authcontroller.postlogin);
router456.post('/logout',authcontroller.postlogout);
router456.get('/signup',authcontroller.getsignup);
router456.post('/signup',authcontroller.postsignup);

module.exports = router456;

