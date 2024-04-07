const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expresshandle = require('express-handlebars');
const errorcontroller = require('./controllers/error');
const db = require('./util/database');
const User = require('./models/user');
const app = express();


app.set('view engine','ejs');
app.set('views','views');

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');


app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
    User.findbyid('660e73743de020eb8d13dace')
    .then( user => {
        req.user = new User(user._id, user.name , user.email , user.cart );
        next();
    })
    .catch( err => {
        console.log(err);
    })
})

app.use('/admin',adminroutes); 
app.use(shoproutes);

app.use(errorcontroller.error404);

db.mongoconnect ( () => {
    app.listen(3000);
})



