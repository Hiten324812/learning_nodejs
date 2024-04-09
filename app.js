const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorcontroller = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');
const app = express();


app.set('view engine','ejs');
app.set('views','views');

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');


app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use( (req,res,next) => {
    User.findById('6614d313af2192cd51aa13bb')
    .then( user => {
        req.user = user;
        next();
    })
    .catch( err => {
        console.log(err);
    })
});


app.use('/admin',adminroutes); 
app.use(shoproutes);

app.use(errorcontroller.error404);


mongoose.connect('mongodb+srv://hitenmistry354:hiten@cluster0.cal3ddh.mongodb.net/shop')
.then( result => {
    User.findOne().then( user => {

        if ( !user )
        {
            const user = new User({
                name : "hiten",
                email : 'hitenmsitry354@gmail.com',
                cart : []
            });
            user.save();
        }
        
    } );

    app.listen(3000);
})
.catch( err => {
    console.log(err);
});