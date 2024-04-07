const mongo = require('mongodb');
const getdb = require('../util/database').getdb;

class Product {
  constructor(title,price,description,imageurl,id,userid)
  {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageurl = imageurl;
    this._id = id;
    this.userid = userid;
  }

  save()
  {

    const db = getdb();

    let dbop;
        
    if ( this._id )
    {
         dbop = db.collection('products').updateOne(
          { 
            _id : new mongo.ObjectId(this._id)} , {
              $set : {
                title : this.title ,
                price : this.price,
                description : this.description,
                imageurl : this.imageurl
              } 
                
          })

    }
    else{
         
      dbop = db.collection('products')
      .insertOne(this);

    }

 

    return dbop
        .then( result => {
             console.log('save function complete !!');
             console.log(result);
             return result;
        } )
        .catch ( err => {
          console.log(err)});
   
  }

  static fetchall()
  {
    const db = getdb();
    return db.collection('products').find().toArray()
    .then( result => {
      return result;
    })
    .catch( err => {
      console.log(err);
    });
  }

  static findbyid(id)
  {
    const db = getdb();
    return db.collection('products').findOne({ _id : new mongo.ObjectId(id) })
    .then( result => {
      return result;
    })
    .catch ( err => console.log(err) );

  }


  static deletebyid(id)
  {
     const db = getdb();
     
     return db.collection('products').deleteOne({
      _id : new mongo.ObjectId(id)
     })
     .then( result => {
      console.log('delete function called ');
      console.log(result);
      return result;
     })
     .catch ( err => {
      console.log(err);
     });

  }


}


module.exports = Product;