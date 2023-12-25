const express = require('express');

const app = express();


app.use( (req,res,next) => {
    console.log('in the middleware !');

    res.send("<h1> hello hi my name is express !!! </h1>");
    // ..
});

app.listen(3000);

