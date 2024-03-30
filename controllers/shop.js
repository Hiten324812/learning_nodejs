
const Product = require('../models/product');
const process = require('process');
const Cart = require('../models/cart');

exports.getproducts = (req,res,next) => {
    Product.findAll()
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
    Product.findAll({
        where : {
            id : pid
        }
    })
    .then( (product) => {
        res.render('shop/product-detail',{ product : product[0] ,pageTitle : product[0].title , path : '/products'});
    })
    .catch( err => console.log(err));


};

exports.getindex = (req,res,next) => {

    Product.findAll()
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

            const total_sum = carts.totalprice;
            

            res.render('shop/cart',{
                path : '/cart' ,
                pageTitle : 'Your cart details',
                products : cartarray,
                total_bill : total_sum
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