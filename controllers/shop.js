
const Product = require('../models/product');


exports.getproducts = (req,res,next) => {
    Product.fetchall( (products) => {
        res.render('shop/product-list',{
         prods : products , 
         pageTitle : 'shop flipkart' , 
         path : '/products' 
        });
    });
  
    // ..
};

exports.getindex = (req,res,next) => {

    Product.fetchall( (products) => {
        res.render('shop/index',{
         prods : products , 
         pageTitle : 'shop' , 
         path : '/' 
        });
    });

}

exports.getcart = (req,res,next) =>{
    res.render('shop/cart',{
      path : '/cart' ,
      pageTitle : 'Your cart'
    });
}

exports.getcheckout = (req,res,next) => {
    res.render('shop/checkout',{
       path : '/checkout',
       pageTitle : 'Checkout' 
    });
}