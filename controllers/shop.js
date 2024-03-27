
const Product = require('../models/product');
const process = require('process');
const Cart = require('../models/cart');

exports.getproducts = (req,res,next) => {
    Product.fetchall( (products) => {
        res.render('shop/product-list',{
         prods : products , 
         pageTitle : 'all products ' , 
          
         path : '/products' 
        });
    });
  
    // ..
};

exports.getproduct = (req,res,next) =>{

    const pid = req.params.productid;
    Product.findbyid(pid, product => {
        res.render('shop/product-detail',{ product : product ,pageTitle : product.title , path : '/products'});
    })


};

exports.getindex = (req,res,next) => {

    Product.fetchall( (products) => {
        res.render('shop/index',{
         prods : products , 
         pageTitle : 'shop' , 
         path : '/' 
        });
    });

};

exports.getcart = (req,res,next) =>{

    Cart.getcart( carts => {
     
        Product.fetchall( products => {

            const cartarray = [];
        
            for (const prod of products )
            {
               const cartproduct = carts.products.find( pr => pr.id === prod.id)
               
               if( cartproduct )
                {
                    cartarray.push({ product : prod ,  qty : cartproduct.qty });
                }
            }
            

            res.render('shop/cart',{
                path : '/cart' ,
                pageTitle : 'Your cart details',
                products : cartarray
              });

        });

    });
    
};

exports.postcart = (req,res,next) =>{
  const prodid = req.body.productid;
   Product.findbyid(prodid, product => {
      Cart.addproduct(prodid,product.price);
   });
  res.redirect('/cart');
};

exports.deletecartitem = (req,res,next) => {

     const prodid = req.body.prid;
     Product.findbyid(prodid , product => {
        Cart.deleteproduct(prodid , product.price);
        res.redirect('/cart');

     })


};

exports.getcheckout = (req,res,next) => {
    res.render('shop/checkout',{
       path : '/checkout',
       pageTitle : 'Checkout' 
    });
}