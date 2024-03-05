const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );


module.exports = class Cart{
  
    static addproduct(id,price){
      
        fs.readFile(p,(err,filecontent) => {
            let cart = { products : [] , totalprice : 0 };
            if ( !err )
            {
                cart = JSON.parse(filecontent);
            }

            const existingproductindex = cart.products.findIndex( prod => prod.id === id);

            const existingproduct = cart.products[existingproductindex];

            let updateproduct;

            if (existingproduct)
            {
                updateproduct = existingproduct;

                updateproduct.qty = updateproduct.qty + 1;
                cart.products[existingproductindex] = updateproduct;
            }
            else{
                updateproduct = { id : id , qty : 1};
                cart.products = [...cart.products,updateproduct];
            }

          cart.totalprice = cart.totalprice + +price;


      fs.writeFile(p,JSON.stringify(cart) , (err) => {
        console.log(err);
      });

        });
        
    }

}