
const Product = require('../models/product');
const process = require('process');
const Cart = require('../models/cart');
const Order = require('../models/orders');
const exp = require('constants');
const product = require('../models/product');
const user = require('../models/user');



exports.getindex = (req,res,next) => {

  Product.find()
   .then( rows => {

      res.render('shop/index',{
          prods : rows , 
          pageTitle : 'shop' , 
          path : '/' 
         });
   })
   .catch( err => console.log(err) );

};

exports.getproducts = (req,res,next) => {
    Product.find()
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
    Product.findById(pid)
    .then( (product) => {
        res.render('shop/product-detail',{ product : product ,pageTitle : product.title , path : '/products'});
    })
    .catch( err => console.log(err));


};


exports.getcart = (req,res,next) =>{

     
     req.user.populate('cart.productid')
     .then( user => {
    
        const result = user.cart;
    
        res.render('shop/cart',{
            path : '/cart' ,
            pageTitle : 'Your cart details',
            products : result
          });    
     })
     .catch( err => {
        console.log(err);
     })
     
    
};

exports.postcart = (req,res,next) => {

    const prodid = req.body.productid;

    Product.findById(prodid)
    .then( result => {
       return req.user.addtocart(result);
    })
    .then( result => {
        console.log("product added to cart !!");
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })

};

exports.deletecartitem = (req,res,next) => {

     const prodid = req.body.prid;

     req.user.removecart(prodid)
     .then( (result) => {
        console.log(result);
      res.redirect('/cart');
     })
     .catch( err => {
      console.log(err);
     })
    

};

exports.getorder = (req,res,next) => {
 
   req.user.populate('cart.productid')
   .then( user => {
     
     const products = user.cart;

     const result = products.map( i => {
        return { quantity : i.quantity , product : { ...i.productid._doc } }
     });


     const order = new Order({
        userid : req.user._id,
        cart : result 
     });

     return order.save();
     
   })
   .then( result => {
    
    return req.user.clearcart();
  
   })
   .then( result =>{

     res.redirect('/orders');

   })
   .catch( err => {
    console.log(err);
   })

};

exports.gotorder = ( req,res,next ) =>{
   

  Order.find({userid : req.user._id})
  .then( result => {

    res.render('shop/orders' , { path : '/orders' , pageTitle : 'your orders' , orders : result } );

  })
  .catch( err => {
    console.log(err);
  })

  
}


