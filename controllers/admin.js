
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

    Product.findByPk(productid)
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

    req.user.createProduct({
        title : req.body.title,
        price : req.body.price,
        description : req.body.description,
        imageurl : req.body.imageurl,
        userId : req.user.id
    })
    .then( result => {
        console.log(result);
    })
    .catch(err => console.log(err));

    };

exports.posteditproduct = (req,res,next) => {
     
    const prodid = req.body.productid;

    Product.update({
        title : req.body.title,
        price : req.body.price,
        imageurl : req.body.imageurl ,
        description : req.body.description
    },{
        where : {
            id : prodid
        }
    })
      
    res.redirect('/admin/products');
    
};

exports.deleteproduct = (req,res,next) => {

    const productid = req.body.prodid;

    Product.destroy({
        where : {
            id : productid
        }
    });

    res.redirect('/admin/products');
    
}

exports.getproducts = (req,res,next) => {
    Product.findAll()
    .then( products => {
        res.render('admin/product-list-admin',{
            prods : products , 
            pageTitle : 'admin product list' , 
            path : '/admin/products' 
           });
    })
    .catch( err => console.loglog(err));
}

