const mongo = require('mongodb');
const getdb = require('../util/database').getdb;

class User {
    constructor(id, username , email , cart ){
        this.name = username ;
        this.email = email;
        this.cart = cart ; // { items : [] }
        this._id = id ? new mongo.ObjectId(id) : null ;
    }

    save(){

        const db = getdb();
        return db.collection('user').insertOne(this);

    }

    addtocart(product)
    {


        if ( !this.cart )
        {
            this.cart = [] ;
        }
        const cartproduct = this.cart.findIndex( cp => {return cp.productid.toString() === product._id.toString() } );

        // console.log(cartproduct);
        // console.log(this.cart.items);


         const db = getdb();

         let temp = [ ...this.cart ] ;

        if ( cartproduct === -1 )

        {
             temp.push({
                productid : new mongo.ObjectId(product._id),
                quantity : 1 
             });
        }

        else{

          temp[cartproduct].quantity = temp[cartproduct].quantity + 1 ;
          
        }

       
        return db.collection('user').updateOne({ _id : new mongo.ObjectId(this._id) }, {
            $set : {
               cart : temp
            }
        })
        
         
    }

    getCart()
    {
        const db = getdb();

        const productids = this.cart.map( i => {
            return i.productid;
        });

        return db.collection('products').find({ _id : { $in : productids }})
        .toArray()
        .then( products => {
            return products.map( p => {
                   return { ...p , qty : this.cart.find(i => {
                    return i.productid.toString() === p._id.toString();
                   }).quantity
                }
            })
        })

    }

    deletecart(productid){
       const updatecart = [ ...this.cart ];

       const productindex = this.cart.filter( cp => { return cp.productid.toString() !== productid.toString() });

       const db = getdb();

       return db.collection('user').updateOne( { _id : new mongo.ObjectId(this._id) } , {
        $set : { 
            cart : productindex
        }
       })
       .then( result => {
        return result;
       })
       .catch( err => {
        console.log(err);
       })




    }

    addorder(){
        const db = getdb();

        return this.getCart().then( products => {
          
            return db.collection('orders').insertOne({cart : products , userid : new mongo.ObjectId(this._id) })
        })
        .then(result => {
              return db.collection('user').updateOne({
                _id : new mongo.ObjectId(this._id)
              } , {
                $set : {
                    cart : []
                }
              })
        })
        .catch( err => {
            console.log(err);
        });

    }

    static findbyid(id){
        const db = getdb();
        return db.collection('user').findOne({_id : new mongo.ObjectId(id)});
    }

    showorders()
    {
        const db = getdb();

        return db.collection('orders').find({
            userid : new mongo.ObjectId(this._id)
        } ).toArray()
        .then( result => {
            return result;
        })
        .catch( err => {
            console.log(err);
        }); 
    }
}

module.exports = User;