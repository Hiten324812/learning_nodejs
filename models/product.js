const fs = require('fs');
const path = require('path');


module.exports = class Product{

    constructor(title,imageurl,description,price){
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = price;
    }

    save(){
       const p = path.join(path.dirname(process.mainModule.filename),
       'data',
       'products.json');

       console.log(p);

       fs.readFile(p, (err,filecontent) => {

        let products = [];

        if (!err){
          products = JSON.parse(filecontent);
        }

        products.push(this);

        fs.writeFile(p,JSON.stringify(products), (err) => {
             console.log(err);
        });
       });
    }

    static fetchall(cb){

        const p = path.join(path.dirname(process.mainModule.filename),
       'data',
       'products.json');

        fs.readFile(p, (err, filecontent) => {
            if (err){
                cb([]);
            }
           
           cb(JSON.parse(filecontent));
        });
    }

}