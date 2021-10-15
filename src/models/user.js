
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken")
const usersschema = new mongoose.Schema({
   
    first_name : {
        type:String,
        required:true,
        minlength:3
    },
    last_name : {
        type:String,
        required:true,
        minlength:3
    }, 
     email : {
            type:String,
            required:true,
            unique:[true , "email id already Present"],
           
        },
    password : {
        type: String,
        required:true
    },
     
    phonenumber : {
        type:Number,
        min:10,
        required:true
    },
    address: {
        type: String,
    },
    tokens :[{
            type:String,
        }
    
    ]
    
        
        
    
    });

usersschema.methods.generateAuthToken = async function(req,res){
try {
    let params=({
        email:this.email
    })
    let Token = jwt.sign(params , process.env.TOKEN_SECRET);
    // this.token = Token
    if (this.tokens.length < 3) {
        this.tokens=this.tokens.concat(Token);
        await this.save();
        return Token;
    }
   
} catch (error) {
  console.log(error)
}
}



const user = mongoose.model('users' ,usersschema);
module.exports = user;