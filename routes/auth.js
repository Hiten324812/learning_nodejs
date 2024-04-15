const express = require('express');
const authcontroller = require('../controllers/auth');

const router456 = express.Router();

router456.get('/login', authcontroller.getlogin);
router456.post('/login',authcontroller.postlogin);
router456.post('/logout',authcontroller.postlogout);
router456.get('/signup',authcontroller.getsignup);
router456.post('/signup',authcontroller.postsignup);
router456.get('/reset',authcontroller.getreset);
router456.post('/reset',authcontroller.postreset);
router456.get('/reset/:token',authcontroller.getnewpassword);
router456.post('/setnewpassword',authcontroller.setnewpassword);

module.exports = router456;

