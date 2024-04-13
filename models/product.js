const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productschema = new schema({
   title : {
    type : String,
    required : true 
   } , 
   price : {
    type : Number,
    required : true
   } ,
   description : {
    type : String,
    required : true ,
   } ,
   imageurl : {
    type : String,
    required : true 
   } , 
   userid : {
      type : schema.Types.ObjectId,
      ref : 'user',
      required : true 
   }

});

module.exports = mongoose.model('product' , productschema);