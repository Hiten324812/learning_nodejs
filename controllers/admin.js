
const { mongo } = require('mongoose');
const Product = require('../models/product');

exports.getaddproduct = (req,res,next) => {
  
    res.render('admin/edit-product',{ pageTitle : 'add-product html' , path : '/admin/add-product' , editing : false } );
     // ..
 };


 exports.geteditproduct = (req,res,next) => {
  
    const editmode = req.query.edit;

    const productid = req.params.productid;


    if ( !editmode )
    {
       res.redirect('/');
    }

    Product.findbyid(productid)
    .then( product => {
        if ( !product )
        {
            res.redirect('/');
        }

       
        res.render('admin/edit-product',{ pageTitle : 'edit-product html' , path : '/admin/edit-product' , editing : editmode , product : product} )
    })
    .catch( err => console.log(err) );
     // ..
 };

exports.postaddproduct = (req,res,next) =>{

    // req.user.createProduct({
    //     title : req.body.title,
    //     price : req.body.price,
    //     description : req.body.description,
    //     imageurl : req.body.imageurl,
    //     userId : req.user.id
    // })
    const product = new Product(req.body.title,req.body.price,req.body.description,req.body.imageurl,null,req.user._id);
    product.save()
    .then( () => {
        console.log('created products');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

    };

exports.posteditproduct = (req,res,next) => {
     
    const prodid = req.body.productid;
    
    const product = new Product(req.body.title,req.body.price,req.body.description,req.body.imageurl,new mongo.ObjectId(prodid));

    product.save()
    .then( (result) => {
        console.log('updated products !!!');
        console.log(result);
    })
    .catch ( err => console.log(err) );
      
    res.redirect('/admin/products');
    
};

exports.deleteproduct = (req,res,next) => {

    const productid = req.body.prodid;

    Product.deletebyid(productid)
    .then( result => {
        console.log('delete done !!!');
        console.log(result);
    })
    .catch( err => {
        console.log(err);
    });

    res.redirect('/admin/products');
    
}

exports.getproducts = (req,res,next) => {
    Product.fetchall()
    .then( products => {
        res.render('admin/product-list-admin',{
            prods : products , 
            pageTitle : 'admin product list' , 
            path : '/admin/products' 
           });
    })
    .catch( err => console.loglog(err));
}

