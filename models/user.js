const mongoose = require('mongoose');
const mongo = require('mongodb');


const schema = mongoose.Schema;

const userschema = new schema({

    name : {
        type : String,
        required : true
    } ,

    email : {
        type : String ,
        required : true
    } ,

    cart : [ {
        productid : { type : schema.Types.ObjectId , required : true , ref : 'product' } , quantity : { type : Number , require : true }
    } ]
});


userschema.methods.addtocart = function(product) {
    const productindex = this.cart.findIndex( cp => { 
        return cp.productid.toString() === product._id.toString();
    })

    const updatecart = [ ...this.cart ];

    if ( productindex >= 0 )
    {
           updatecart[productindex].quantity =  updatecart[productindex].quantity + 1;
           this.cart = updatecart;
    }
    else
    {
              updatecart.push({
                productid : new mongo.ObjectId(product._id),
                quantity : 1 
              });

              this.cart = updatecart;
            
    }

    return  this.save();
}

userschema.methods.removecart = function(product)
{
    updatecart = this.cart.filter( cp => {
        return cp.productid.toString() !== product.toString()
    });

    this.cart = updatecart;

    return this.save();
}

userschema.methods.clearcart = function()
{
    this.cart = [];

    return this.save();
}

module.exports = mongoose.model('user',userschema);