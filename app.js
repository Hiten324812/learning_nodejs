const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded( {extended: true}));

app.use( '/add-product',(req,res,next) => {
  
   res.send('<form action="/product" method="POST"> <input type="text" name="message"> <button type="submit"> send data </button> </form>');
    // ..
});

app.use('/product',(req,res,next) =>{
    console.log(req.body);
    res.redirect('/');
    });

app.use('/',(req,res,next) => {
    res.send("<h1> hello hi my name is express !!! </h1>");
    // ..
});

app.listen(3000);

