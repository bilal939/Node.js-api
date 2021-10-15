const mongoose = require("mongoose");

const ProductScheme = new mongoose.Schema({
   
    name : {
        type:String,
        required:true,
        minlength:3
    },
   Category : {
        type:String,
        required:true,
        minlength:3
    }, 
    Current_Price : {
            type:Number,
            required:true,
           
        },
    sale_price: {
        type: Number,
        required:true
    },
     
    status : {
        type:String,
        min:10,
        required:true
    }
    });

const product = mongoose.model('products' ,ProductScheme);

module.exports = product;