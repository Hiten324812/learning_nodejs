const fs = require('fs');
const path = require('path');
const cart = require('../models/cart');


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

    constructor(id,title,imageurl,description,price){
    this.id = id;
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = price;
    }

    save(){

       getproductsfromfile( products => {
            
        if (this.id)
        {
           const existingproduct = products.findIndex( prod => prod.id === this.id );
           
           products[existingproduct] = this;
           
        }

        else{

          this.id = Math.random().toString();
     
           products.push(this);
          
        }

        fs.writeFile(p,JSON.stringify(products), (err) => {
          console.log(err);
       });

      

       });
       
       
       
    }

    static deletebyid(id)
    {
        getproductsfromfile ( products => {
      
           const product = products.find( prod => prod.id === id);
           const prodindex = products.filter(prod => prod.id !== id );

            fs.writeFile( p , JSON.stringify(prodindex) , (err) => {
                if(!err)
                {
                  cart.deleteproduct(id,product.price);
                }
            })
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