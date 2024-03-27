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

    static deleteproduct(id,product_price)
    {
        fs.readFile( p , (err , filecontent) => {
            if (err)
            {
                return;
            }

            const cart = JSON.parse(filecontent);

            
            const productindex = cart.products.findIndex(prod => prod.id === id);
         
             if(productindex === -1)
             {
                return;
             }
             
             const prodqty = cart.products[productindex].qty;
  
             cart.products = cart.products.filter( prod => prod.id !== id);
            
             cart.totalprice = cart.totalprice - prodqty*product_price;
          
             fs.writeFile( p , JSON.stringify(cart) , (err) => {
                console.log(err);
             })

        });
    }

    static getcart(cb){

        fs.readFile( p , (err, filecontent) => {

            if (err )
            {
               
                cb(null);

            }

            else
            {
                const cart = JSON.parse(filecontent);

                cb(cart);
            }
           

        }); 

    }

}