
const Product = require('../models/product');

exports.getaddproduct = (req,res,next) => {
  
   res.render('admin/edit-product',{ pageTitle : 'add-product html' , path : '/admin/add-product' , editing : false , isloggedin : req.isloggedin } );
 
 };


 exports.geteditproduct = (req,res,next) => {
  
  

    const editmode = req.query.edit;

    const productid = req.params.productid;




    if ( !editmode )
    {
       res.redirect('/');
    }

    Product.findById(productid)
    .then( product => {
        if ( !product )
        {
            res.redirect('/');
        }

       
        res.render('admin/edit-product',{ pageTitle : 'edit-product html' , path : '/admin/edit-product' , editing : editmode , product : product , isloggedin : req.session.isloggedin } )
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
    const product = new Product({
        title : req.body.title ,
        price : req.body.price,
        description : req.body.description,
        imageurl : req.body.imageurl,
        userid : req.user
    });

    product.save()
    .then( (result) => {
        console.log('created products');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

    };

exports.posteditproduct = (req,res,next) => {
     
    const prodid = req.body.productid;
    
    
    Product.findById(prodid).then( product => {

        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.imageurl = req.body.imageurl;
        
        return product.save();
    })
    .then( (result) => {
        console.log('updated products !!!');
    })
    .catch ( err => console.log(err) );
      
    res.redirect('/admin/products');
    
};

exports.deleteproduct = (req,res,next) => {

    const productid = req.body.prodid;

    Product.findByIdAndDelete(productid)
    .then( result => {
        console.log('delete done !!!');
    })
    .catch( err => {
        console.log(err);
    });

    res.redirect('/admin/products');
    
}

exports.getproducts = (req,res,next) => {
    Product.find()
    .then( products => {
        res.render('admin/product-list-admin',{
            prods : products , 
            pageTitle : 'admin product list' , 
            path : '/admin/products' ,
            isloggedin : req.session.isloggedin
           });
    })
    .catch( err => console.log(err));
}

