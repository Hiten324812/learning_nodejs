
const Product = require('../models/product');
const process = require('process');
const Cart = require('../models/cart');
const exp = require('constants');

exports.getproducts = (req,res,next) => {
    Product.fetchall()
    .then( rows => {
        res.render('shop/product-list',{
            prods : rows , 
            pageTitle : 'all products ' ,    
            path : '/products' 
           });
    })
    .catch( err => console.log(err));
  

};

exports.getproduct = (req,res,next) =>{

    const pid = req.params.productid;
    Product.findbyid(pid)
    .then( (product) => {
        console.log(product);
        res.render('shop/product-detail',{ product : product ,pageTitle : product.title , path : '/products'});
    })
    .catch( err => console.log(err));


};

exports.getindex = (req,res,next) => {

    Product.fetchall()
     .then( rows => {
        res.render('shop/index',{
            prods : rows , 
            pageTitle : 'shop' , 
            path : '/' 
           });
     })
     .catch( err => console.log(err) );

};

exports.getcart = (req,res,next) =>{


    let total_sum = 0 ;
     
    req.user.getCart()
    .then( result => {

     
      result.forEach(element => {
        
        total_sum = total_sum + (element.price)*(element.qty);

      });

      res.render('shop/cart',{
        path : '/cart' ,
        pageTitle : 'Your cart details',
        products : result,
        total_bill : total_sum
      });
          
    })   
    .catch( err => {
      console.log(err);
    })
    
};

exports.postcart = (req,res,next) =>{
  const prodid = req.body.productid;

  Product.findbyid(prodid)
  .then( product => {
     return req.user.addtocart(product);
  })
  .then( result => {
    console.log(result);
    res.redirect('/cart');
  })
  .catch ( err => console.log( err));
};

exports.deletecartitem = (req,res,next) => {

     const prodid = req.body.prid;

     req.user.deletecart(prodid)
     .then( (result) => {
      res.redirect('/cart');
     })
     .catch( err => {
      console.log(err);
     })
    

};

exports.getorder = (req,res,next) => {
 
  req.user.addorder().then( result => {
    res.redirect('/orders');
  })
  .catch( err => {
    console.log(err);
  })

};

exports.gotorder = ( req,res,next ) =>{
   

  req.user.showorders()
  .then( result => {

    res.render('shop/orders' , { path : '/orders' , pageTitle : 'your orders' , orders : result } );

  })
  .catch( err => {
    console.log(err);
  })

  
}

