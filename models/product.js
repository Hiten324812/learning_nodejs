const fs = require('fs');
const path = require('path');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );

  const getproductsfromfile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
  
module.exports = class Product{

    constructor(title,imageurl,description,price){
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = price;
    }

    save(){
        this.id = Math.random().toString();
     
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
     getproductsfromfile(cb);
    }

    static findbyid(id,cb){
        getproductsfromfile(products => {
            const product = products.find(p => p.id == id);
            cb(product);
        })
    }

}