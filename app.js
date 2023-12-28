const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expresshandle = require('express-handlebars');

const app = express();

app.engine('hbs',expresshandle());
app.set('view engine','hbs');
app.set('views','views');

const admindata = require('./routes/admin');
const shoproutes = require('./routes/shop');

app.use(bodyParser.urlencoded( {extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',admindata.routes); 
app.use(shoproutes.routes);

app.use((req,res) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});

app.listen(3000);

