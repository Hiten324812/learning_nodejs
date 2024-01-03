
const Product = require('../models/product');
const productmodel = require('../models/product');

exports.getaddproduct = (req,res,next) => {
  
    res.render('admin/add-product',{ pageTitle : 'add-product html' , path : '/admin/add-product'} );
     // ..
 };

exports.postaddproduct = (req,res,next) =>{
    const product = new Product(req.body.title,req.body.imageurl,req.body.description,req.body.price);
    product.save();
    res.redirect('/'); 
    };

exports.getproducts = (req,res,next) => {
    Product.fetchall( (products) => {
        res.render('admin/product-list-admin',{
         prods : products , 
         pageTitle : 'admin product list' , 
         path : '/admin/products' 
        });
    });
}