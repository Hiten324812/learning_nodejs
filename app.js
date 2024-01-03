const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expresshandle = require('express-handlebars');
const productcontroller = require('./controllers/shop');
const errorcontroller = require('./controllers/error');
const app = express();


app.set('view engine','ejs');
app.set('views','views');

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');

app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminroutes); 
app.use(shoproutes);

app.use(errorcontroller.error404);

app.listen(3000);

