const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorcontroller = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const mongo = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();

const store = new mongo({
    uri : 'mongodb+srv://hitenmistry354:hiten@cluster0.cal3ddh.mongodb.net/shop',
    collection : 'session'
});

const csrfprotection = csrf();


app.set('view engine','ejs');
app.set('views','views');

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');
const authroutes = require('./routes/auth');


app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({ secret : 'my name is hiten' , resave : false , saveUninitialized : false ,
store : store 
}));

app.use(csrfprotection);
app.use(flash());

app.use( (req,res,next) => {

    if (!req.session.user)
    {
        req.session.isloggedin = false;
        return next();
    }
   User.findById(req.session.user._id)
   .then( user => {
    req.user = user;
    next();
   })
   .catch( err => {
    console.log(err);
   })
});

app.use( (req,res,next) => {
   res.locals.isloggedin = req.session.isloggedin;
   res.locals.csrftoken = req.csrfToken();
   next();
});


app.use(authroutes);
app.use('/admin',adminroutes); 
app.use(shoproutes);

app.use(errorcontroller.error404);


mongoose.connect('mongodb+srv://hitenmistry354:hiten@cluster0.cal3ddh.mongodb.net/shop')
.then( result => {
    app.listen(3000);
})
.catch( err => {
    console.log(err);
});