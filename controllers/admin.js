
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

    Product.findbyid(productid, product => {
        
        if ( !product )
        {
            res.redirect('/');
        }

       
        res.render('admin/edit-product',{ pageTitle : 'edit-product html' , path : '/admin/edit-product' , editing : editmode , product : product } )
    });
     // ..
 };

exports.postaddproduct = (req,res,next) =>{
    const product = new Product(null,req.body.title,req.body.imageurl,req.body.description,req.body.price);
    product.save();
    return res.redirect('/'); 
    };

exports.posteditproduct = (req,res,next) => {
     
    const prodid = req.body.productid;

    const updateproduct = new Product(prodid,req.body.title,req.body.imageurl,req.body.description,req.body.price);

    updateproduct.save();
      
    res.redirect('/admin/products');
    
};

exports.deleteproduct = (req,res,next) => {

    const productid = req.body.prodid;

    Product.deletebyid(productid);

    res.redirect('/admin/products');
    
}

exports.getproducts = (req,res,next) => {
    Product.fetchall( (products) => {
        res.render('admin/product-list-admin',{
         prods : products , 
         pageTitle : 'admin product list' , 
         path : '/admin/products' 
        });
    });
}

