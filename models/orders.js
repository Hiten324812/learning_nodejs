const mongoose = require('mongoose');

const schema = mongoose.Schema;

const orderschema = new schema({
    cart : [ {

            product: {
                type : Object,
                required : true
            } ,

            quantity : {
                type : Number,
                required : true
            }
        }
    ] ,
    user : {
       email : {
        type : String,
        required : true
       } ,
       userid : {
        type : schema.Types.ObjectId,
        required : true,
        ref : 'user'
       }
    }
})



module.exports = mongoose.model('order',orderschema);