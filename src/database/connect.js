const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/test',
{
 useCreateIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("connected");
}).catch((e) =>{
    console.log("not connected")
})
}

module.exports = connectDB

