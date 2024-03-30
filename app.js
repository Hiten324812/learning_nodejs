const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expresshandle = require('express-handlebars');
const productcontroller = require('./controllers/shop');
const errorcontroller = require('./controllers/error');
const db = require('./util/database');
const product = require('./models/product');
const user = require('./models/user');
const app = express();


app.set('view engine','ejs');
app.set('views','views');

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');


app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use( (req,res,next) => {
    user.findByPk(1)
     .then( user => {
        req.user = user;
        next();
     })
     .catch( err => console.log(err));
})

app.use('/admin',adminroutes); 
app.use(shoproutes);

app.use(errorcontroller.error404);

product.belongsTo(user,{ onDelete : 'CASCADE'});
user.hasMany(product);

db.sync().then( result => {
  return user.findByPk(1);
})
.then( data => {
    if( !data )
    {
      return user.create({
            id : 1 ,
            name : "hiten",
            email : "hitenmistry354@gmail.com"
        });
    }

    return data;
})
.then( data => {

   app.listen(3000);
})
.catch( err => {
    console.log(err);
})



