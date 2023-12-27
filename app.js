const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');

app.use(bodyParser.urlencoded( {extended: true}));

app.use('/admin',adminroutes);
app.use(shoproutes);

app.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000);

