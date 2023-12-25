const fs = require('fs');


const requestHandler = (req,res) => {

    const url = req.url ;
    const method = req.method;

    if ( url === '/')
   {
    res.write('<html>');
    res.write('<head> <title> Enter the message : </title> </head>');
    res.write('<body> <form action="/message" method="POST"> <input type="text" name="message" > <button type="submit"> send  </button> </form> </body>')
    res.write('</html>');
    return res.end();
   }

   if ( url === '/message' && method === 'POST')
   {
     const body = [];
     req.on('data' , (chunk) => {
        console.log(chunk);
        body.push(chunk);
     });

    return req.on('end',() => {
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        const message = parsedBody.split('=')[0];
        fs.writeFileSync('message.txt',message , err => {
         res.setHeader('Location','/');
        res.statusCode = 302;
       return res.end();
        });

     })
    

   }


    res.setHeader('Content-Type','text');
    res.write('<html>');
    res.write('<head> <title> My first page !!! </title></head>');
    res.write('<body> <h1> hello from my node.js server! </h1> </body>');
    res.write('</html>');
    res.end();

};

exports.handler = requestHandler;
exports.text = 'some hard coded text !!!';



